const express = require('express');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// #5: /current ; GET
router.get('/current', requireAuth, async (req, res) => {
    const {user} = req;
    const currUser = await User.findByPk(user.id);
    const currSpots = await currUser.getSpots();
    res.status(200);
    res.json(currSpots); //add avgRating, previewImage
});

// #22 ; /:spotId/images/:imageId ; DELETE
router.delete('/:spotId/images/:imageId', requireAuth, async (req, res, next) => {
    const currSpotImage = await SpotImage.findAll({where: {
        id: Number(req.params.imageId),
        spotId: Number(req.params.spotId)
    }});
    if (currSpotImage) {
        const err = new Error("Spot Image couldn't be found");
        err.status = 404;
        return next(err);
    }
    const imageToDelete = await SpotImage.destroy({where: {
        id: Number(req.params.imageId),
        spotId: Number(req.params.spotId)
    }});
    res.status(200);
    res.json({message: 'Successfully deleted'});
});

// #8 ; /:spotId/images ; POST
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spotId = Number (req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
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
    res.status(200);
    res.json(newSpotImage);
});

// #12 ; /:spotId/reviews ; GET
router.get('/:spotId/reviews', async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
    if (!currSpot) {
        const err = new Error("Review Image couldn't be found");
        err.status = 404;
        return next(err);
    }
    const reviewsBySpot = await Review.findAll({where: {spotId: spotId}});
    res.status(200);
    res.json(reviewsBySpot); //add User, ReviewImages
});

// #13 ; /:spotId/reviews ; POST
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
    if (!currSpot) {
        const err = new Error("Review Image couldn't be found");
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

// #18 ; /:spotId/bookings ; GET
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = Number(req.params.spotId);
    const bookingsBySpot = await Booking.findAll({where: {spotId : spotId}});
    res.status(200);
    res.json(bookingsBySpot); //add User
});

// #19 ; /:spotId/bookings ; POST
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
    if (!currSpot) {
        const err = new Error("Review Image couldn't be found");
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
        const err = new Error("Sorry, this spot is already booked for the specified dates");
        err.status = 403;
        return next(err);
    }
    // {
    //     "message": "Sorry, this spot is already booked for the specified dates",
    //     "errors": {
    //       "startDate": "Start date conflicts with an existing booking",
    //       "endDate": "End date conflicts with an existing booking"
    //     }
    // }
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
    const currObj = spotToGet.dataValues; //?
    const currReviewStars = await spotToGet.getReview({attributes: ['stars']});
    currObj.numReviews = currReviewStars.length;
    let avgStarRating = 0;
    let totalStars = 0;
    for (let i = 0; i < currReviewStars.length; i++) {
        totalStars += currReviewStars[i];
    }
    avgStarRating = totalStars / numReviews;
    currObj.avgStarRating = avgStarRating;
    const currSpotImages = await SpotImage.getAll({where: {spotId: spotId}, attributes: ['id', 'url', 'preview']});
    currObj.SpotImages = currSpotImages;
    const currOwner = await spotToGet.getOwner({attributes: ['id', 'firstName', 'lastName']});
    currObj.Owner = currOwner;
    res.status(200);
    res.json(currObj);
});

// #9 ; /:spotId/ ; PUT
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const spotToUpdate = await Spot.findByPk(spotId);
    if (!spotToUpdate) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
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

// #10 ; /:spotId/ ; DELETE
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = Number(req.params.spotId);
    const currSpot = await Spot.findByPk(spotId);
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
    res.status(200);
    res.json(allSpots); //add avgRating, previewImage
});

// #7 ; / ; POST
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
