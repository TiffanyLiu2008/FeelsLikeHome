const express = require('express');
const { Booking, Review, ReviewImage, Spot, SpotImage, User, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { Op } = require('sequelize');

const validateQuery = [
    check('page')
        .optional()
        .isInt({min: 1})
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional()
        .isInt({min: 1})
        .withMessage('Size must be greater than or equal to 1'),
    check('minLat')
        .optional()
        .isFloat({min: -90})
        .isFloat({max: 90})
        .withMessage('Minimum latitude is invalid'),
    check('maxLat')
        .optional()
        .isFloat({min: -90})
        .isFloat({max: 90})
        .withMessage('Maximum latitude is invalid'),
    check('minLng')
        .optional()
        .isFloat({min: -180})
        .isFloat({max: 180})
        .withMessage('Minimum longitude is invalid'),
    check('maxLng')
        .optional()
        .isFloat({min: -180})
        .isFloat({max: 180})
        .withMessage('Maximum longitude is invalid'),
    check('minPrice')
        .optional()
        .isInt({min: 0})
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional()
        .isInt({min: 0})
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
];

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({min: -90, max: 90})
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({min: -180, max: 180})
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({min: 1, max: 49})
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({min: 30})
        .withMessage('Description needs a minimum of 30 characters'),
    check('price')
        .exists({ checkFalsy: true })
        .isInt({min: 0})
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateSpotImage = [
    check('preview')
        .exists({ checkFalse: true})
        .withMessage('Preview Image URL is required'),
    handleValidationErrors
];

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
router.post('/:spotId/images', requireAuth, validateSpotImage, async (req, res, next) => {
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
        err.status = 403;
        return next(err);
    }
    const {url, preview} = req.body;
    const newSpotImage = await SpotImage.create({
        url: url,
        preview: preview,
        spotId: spotId
    });
    const returnObj = {
        id: newSpotImage.id,
        url: newSpotImage.url,
        preview: newSpotImage.preview
    };
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
            include: [{model: User, attributes: ['id', 'firstName', 'lastName']}]
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
        err.status = 403;
        return next(err);
    }
    const {startDate, endDate} = req.body;
    if (startDate >= endDate) {
        const err = new Error("endDate cannot be on or before startDate");
        err.status = 400;
        return next(err);
    }
    const existingBooking = await Booking.findAll({where: {
        spotId: spotId,
        [Op.or]: [
            {
                startDate: { [Op.lte]: startDate },
                endDate: { [Op.gte]: startDate },
            },
            {
                startDate: { [Op.gte]: startDate },
                startDate: { [Op.lte]: endDate },
            }
        ]
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
    const spotInfo = await Spot.findByPk(spotId, {
        include: [{model: Review, attributes: []}],
        attributes: {include: [
            [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating']
        ]},
        group: ['Spot.id'],
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
    const returnObj = {};
    returnObj.id = spotInfo.id;
    returnObj.ownerId = spotInfo.ownerId;
    returnObj.address = spotInfo.address;
    returnObj.city = spotInfo.city;
    returnObj.state = spotInfo.state;
    returnObj.country = spotInfo.country;
    returnObj.lat = spotInfo.lat;
    returnObj.lng = spotInfo.lng;
    returnObj.name = spotInfo.name;
    returnObj.description = spotInfo.description;
    returnObj.price = spotInfo.price;
    returnObj.createdAt = spotInfo.createdAt;
    returnObj.updatedAt = spotInfo.updatedAt;
    returnObj.numReviews = spotInfo.numReviews;
    returnObj.avgStarRating = spotInfo.avgStarRating;
    returnObj.SpotImages = spotImages;
    returnObj.Owner = owner;
    res.status(200);
    res.json(returnObj);
});

// #9 ; /:spotId/ ; PUT ; Authen ; Autho
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const oldSpot = await Spot.findByPk(spotId);
    if (!oldSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const ownerId = oldSpot.ownerId;
    const {user} = req;
    const userId = user.id;
    if (userId !== ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    await oldSpot.set({
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
    await oldSpot.save();
    const newSpot = await Spot.findByPk(spotId);
    return res.json(newSpot);
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
        err.status = 403;
        return next(err);
    }
    const spotToDelete = await Spot.destroy({where: {id: spotId}});
    res.status(200);
    res.json({message: "Successfully deleted"});
});

// #4 & #24 ; / ; GET ; with and without Query Filter
router.get('/', validateQuery, async (req, res, next) => {
    const allSpots = await Spot.findAll({
        include: [{model: Review, attributes: []}],
        attributes: {include: [[sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']]},
        group: ['Spot.id'],
        raw: true
    });
        let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;
        if (page || size || minLat || maxLat || minLng || maxLng || minPrice || maxPrice) {
            page = parseInt(page);
            size = parseInt(size);
            if (Number.isNaN(page) || page <= 0) page = 1;
            if (Number.isNaN(size) || size <= 0) size = 20;
            const query = {};
            query.limit = size;
            query.offset = size * (page - 1);
            res.status(200);
            res.json({'Spots': allSpots, page, size});
        } else {
            res.status(200);
            res.json({'Spots': allSpots});
        }
});

// #7 ; / ; POST ; Authen
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
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
