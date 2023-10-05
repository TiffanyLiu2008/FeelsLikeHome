const express = require('express');
const { Booking, Review, ReviewImage, Spot, SpotImage, User, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { Op } = require('sequelize');

function avgRating(arr) {
    let sum = 0;
    arr.forEach((rating) => {
        sum += rating;
    });
    return sum / arr.length;
}

function previewImage(arr) {
    arr.forEach((spotImage) => {
        if (spotImage.preview) {
            return spotImage;
        }
    });
}

// #5: /current ; GET ; Authen
router.get('/current', requireAuth, async (req, res) => {
    const {user} = req;
    const currSpots = await Spot.findAll({
        where: {ownerId: user.id},
        include: [{model: Review, attributes: []}],
        attributes: {include: [[sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']]},
        group: ['Spot.id'],
        raw: true
    });
    res.status(200);
    res.json({'Spots': currSpots});
});

// #8 ; /:spotId/images ; POST ; Authen ; Autho
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
    if (!currSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const ownerId = currSpot.ownerId;
    const {user} = req;
    const userId = user.id;
    if (userId !== ownerId) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }
    const {url, preview} = req.body;
    const newSpotImage = await SpotImage.create({
        url: url,
        preview: preview,
        spotId: spotId
    });
    //hide test
    const returnObj = {...newSpotImage};
    delete returnObj.spotId;
    delete returnObj.createdAt;
    delete returnObj.updatedAt;
    res.status(200);
    res.json(returnObj);
});

// #12 ; /:spotId/reviews ; GET
router.get('/:spotId/reviews', async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
    if (!currSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const currReviews = await Review.findAll({
        where: {spotId: spotId},
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: ReviewImage, attributes: ['id', 'url']}
        ]
    });
    res.status(200);
    res.json({'Reviews': currReviews});
});

// #13 ; /:spotId/reviews ; POST ; Authen
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
    if (!currSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const {user} = req;
    const userId = user.id;
    const existingReview = await Review.findAll({where: {
        userId: userId,
        spotId: spotId
    }});
    if (existingReview.length > 0) {
        const err = new Error("User already has a review for this spot");
        err.status = 500;
        return next(err);
    }
    const {review, stars} = req.body;
    const newReview = await Review.create({
        userId: userId,
        spotId: spotId,
        review: review,
        stars: stars
    });
    res.status(201);
    res.json(newReview);
});

// #18 ; /:spotId/bookings ; GET ; Authen
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
    if (!currSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const ownerId = currSpot.ownerId;
    const {user} = req;
    const userId = user.id;
    if (userId === ownerId) {
        const bookingsBySpotForOwner = await Booking.findAll({
            where: {spotId : spotId},
            includes: [{model: User, attributes: ['id', 'firstName', 'lastName']}]
        });
        res.status(200);
        res.json({'Bookings': bookingsBySpotForOwner});
    } else {
        const bookingsBySpotForNonOwner = await Booking.findAll({
            where: {spotId: spotId},
            attributes: ['spotId', 'startDate', 'endDate']

        });
        res.status(200);
        res.json({'Bookings': bookingsBySpotForNonOwner});
    }
});

// #19 ; /:spotId/bookings ; POST ; Authen ; Autho
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
    if (!currSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const ownerId = currSpot.ownerId;
    const {user} = req;
    const userId = user.id;
    if (userId === ownerId) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }
    const {startDate, endDate} = req.body;
    if (startDate >= endDate) {
        const err = new Error("endDate cannot be on or before startDate");
        err.status = 403;
        return next(err);
    }
    const existingBooking = await Booking.findAll({where: {
        spotId: spotId,
        startDate: {[Op.lte]: endDate},
        endDate: {[Op.gte]: startDate}
    }});
    if (existingBooking.length > 0) {
        const err = new Error("Sorry, this spot is already booked for the specified dates");
        err.status = 403;
        err.errors = ["Start date conflicts with an existing booking", "End date conflicts with an existing booking"];
        return next(err);
    }
    const newBooking = await Booking.create({
        spotId: spotId,
        userId: userId,
        startDate: startDate,
        endDate: endDate
    });
    res.status(200);
    res.json(newBooking);
});

// #6 ; /:spotId/ ; GET
router.get('/:spotId', async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const spotToGet = await Spot.findByPk(spotId);
    if (!spotToGet) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const ownerId = spotToGet.ownerId;
    const returnObj = await Spot.findByPk(spotId, {
        include: [
            {model: Review, attributes: []}
        ],
        attributes: {include: [
            [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating']
        ]},
        raw: true
    });
    const spotImages = await SpotImage.findAll({
        where: {spotId: spotId},
        attributes: ['id', 'url', 'preview']
    });
    const owner = await User.findOne({
        where: {id: ownerId},
        attributes: ['id', 'firstName', 'lastName']
    });
    returnObj.SpotImages = spotImages;
    returnObj.Owner = owner;
    res.status(200);
    res.json(returnObj);
});

// #9 ; /:spotId/ ; PUT ; Authen ; Autho
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const spotToUpdate = await Spot.findByPk(spotId);
    if (!spotToUpdate) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const ownerId = spotToUpdate.ownerId;
    const {user} = req;
    const userId = user.id;
    if (userId !== ownerId) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    if (name.length >= 50) {
        const err = new Error("Name must be less than 50 characters");
        err.status = 404;
        return next(err);
    }
    spotToUpdate.address = address;
    spotToUpdate.city = city;
    spotToUpdate.state = state;
    spotToUpdate.country = country;
    spotToUpdate.lat = lat;
    spotToUpdate.lng = lng;
    spotToUpdate.name = name;
    spotToUpdate.description = description;
    spotToUpdate.price = price;
    res.status(200);
    res.json(spotToUpdate);
});

// #10 ; /:spotId/ ; DELETE ; Authen ; Autho
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
    if (!currSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const ownerId = currSpot.ownerId;
    const {user} = req;
    const userId = user.id;
    if (userId !== ownerId) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }
    const spotToDelete = await Spot.destroy({where: {id: spotId}});
    res.status(200);
    res.json({message: 'Successfully deleted'});
});

// #4 ; / ; GET
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [{model: Review, attributes: []}],
        attributes: {include: [[sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']]},
        group: ['Spot.id'],
        raw: true
    });
    res.status(200);
    res.json({"Spots": allSpots});
});

// #24 ; / ; GET ; Query Filter
router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll({
        include: [{model: Review, attributes: []}],
        attributes: {include: [[sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']]},
        group: ['Spot.id'],
        raw: true
    });
    if (req.query) {
        let {page, size, maxLat, minLat, maxLng, minLng, maxPrice, minPrice} = req.query;
        if (maxLat > 90) {
            const err = new Error("Maximum latitude is invalid");
            err.status = 400;
            return next(err);
        }
        if (minLat < -90) {
            const err = new Error("Minimum latitude is invalid");
            err.status = 400;
            return next(err);
        }
        if (maxLng > 180) {
            const err = new Error("Maximum longitude is invalid");
            err.status = 400;
            return next(err);
        }
        if (minLng < -180) {
            const err = new Error("Minimum longitude is invalid");
            err.status = 400;
            return next(err);
        }
        if (maxPrice < 0) {
            const err = new Error("Maximum price must be greater than or equal to 0");
            err.status = 400;
            return next(err);
        }
        if (minPrice < 0) {
            const err = new Error("Minimum price must be greater than or equal to 0");
            err.status = 400;
            return next(err);
        }
        if (page < 1) {
            const err = new Error("Page must be greater than or equal to 1");
            err.status = 400;
            return next(err);
        }
        if (size < 1) {
            const err = new Error("Size must be greater than or equal to 1");
            err.status = 400;
            return next(err);
        }
        if (!page) {
            page = 1;
        }
        if (!size) {
            size = 20;
        }
        const pagination = {...allSpots};
        pagination.limit = size;
        pagination.offset = size * (page - 1);
        page = parseInt(page);
        size = parseInt(size);
        res.status(200);
        res.json({'Spots': pagination})
    } else {
        res.status(200);
        res.json({'Spots': allSpots});
    }
});

// #7 ; / ; POST ; Authen
router.post('/', requireAuth, async (req, res, next) => {
    const {user} = req;
    const userId = user.id;
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const newSpot = await Spot.create({
        ownerId: userId,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    });
    res.status(201);
    res.json(newSpot);
});

module.exports = router;
