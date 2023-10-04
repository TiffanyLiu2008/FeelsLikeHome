const express = require('express');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

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

function reqAuthorization(id1, id2) {
    if (id1 === id2) {
        return true;
    } else {
        return false;
    }
}

// #5: /current ; GET ; Authen
router.get('/current', requireAuth, async (req, res) => {
    const {user} = req;
    const currSpots = await Spot.findAll({where: {ownerId: user.id}});
    const returnObj = {Spots: []};
    currSpots.forEach((subObj) => {
        returnObj.Spots.push(subObj);
    });
    res.status(200);
    res.json(returnObj); //add avgRating
});

// #8 ; /:spotId/images ; POST ; Authen ; Autho
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spotId = Number (req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
    const ownerId = await currSpot.getUser({attributes: ['id']});
    const {user} = req;
    const userId = user.id;
    if (!reqAuthorization(userId, ownerId)) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }
    if (!currSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const {url, preview} = req.body;
    const newSpotImage = await SpotImage.create({
        url: url,
        preview: preview,
        spotId: spotId
    });
    // const returnObj = newSpotImage.toObject();
    // delete returnObj.spotId;
    // delete returnObj.updatedAt;
    // delete returnObj.createdAt;
    res.status(200);
    res.json(newSpotImage);
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
    const reviewsBySpot = await Review.findAll({where: {spotId: spotId}});
    res.status(200);
    res.json(reviewsBySpot); //add User, ReviewImages
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
    if (existingReview) {
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
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = Number(req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
    if (!currSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const bookingsBySpot = await Booking.findAll({where: {spotId : spotId}});
    // add User
    // const user = await bookingsBySpot.getUser({attributes: ['id', 'firstName', 'lastName']});
    // returnObj.User = user;
    res.status(200);
    res.json({"Booking": bookingsBySpot});
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
    const {user} = req;
    const userId = user.id;
    const {requestedStartDate, requestedEndDate} = req.body;
    const existingBooking = await Booking.findAll({where: {
        spotId: spotId,
        startDate: {[Op.lt]: requestedEndDate},
        endDate: {[Op.gt]: requestedStartDate}
    }});
    if (existingBooking) {
        const errObj = {
            "message": "Sorry, this spot is already booked for the specified dates",
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        };
        const err = new Error(errObj);
        err.status = 403;
        return next(err);
    }
    const newBooking = await Booking.create({
        spotId: spotId,
        userId: userId,
        startDate: requestedStartDate,
        endDate: requestedEndDate
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
    // add numReviews, avgStarRating, SpotImages, Owner
    const returnObj = spotToGet.dataValues;
    const currReviewStars = await spotToGet.getReviews({attributes: ['stars']}); //?
    const currNumReviews = currReviewStars.length;
    const currAvgStarRating = avgRating(currReviewStars);
    const currSpotImages = await SpotImage.findAll({where: {spotId: spotId}, attributes: ['id', 'url', 'preview']});
    const currOwner = await spotToGet.getUser({attributes: ['id', 'firstName', 'lastName']});
    returnObj.numReviews = currNumReviews;
    returnObj.avgStarRating = currAvgStarRating;
    returnObj.SpotImage = currSpotImages;
    returnObj.Owner = currOwner;
    res.status(200);
    res.json(returnObj);
});

// #9 ; /:spotId/ ; PUT ; Authen ; Autho
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const spotToUpdate = await Spot.findByPk(spotId);
    const ownerId = await spotToUpdate.getUser({attributes: ['id']});
    const {user} = req;
    const userId = user.id;
    if (!reqAuthorization(userId, ownerId)) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }
    if (!spotToUpdate) {
        const err = new Error("Spot couldn't be found");
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
    const spotId = Number (req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
    const ownerId = await currSpot.getUser({attributes: ['id']});
    const {user} = req;
    const userId = user.id;
    if (!reqAuthorization(userId, ownerId)) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }
    if (!currSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const spotToDelete = await Spot.destroy({where: {id: spotId}});
    res.status(200);
    res.json({message: 'Successfully deleted'});
});

// #4 ; / ; GET
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll();
    const returnObj = {Spots: []};
    allSpots.forEach((subObj) => {
        returnObj.Spots.push(subObj);
    });
    res.status(200);
    res.json(returnObj); //add avgRatingß
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
