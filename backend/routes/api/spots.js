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
    const imageToDelete = await SpotImage.destroy({where: {
        id: req.params.imageId,
        spotId: req.params.spotId
    }});
    res.status(200);
    res.json({message: 'Successfully deleted'});
    //err: 404, 'Review Image couldn't be found'
});

// #8 ; /:spotId/images ; POST
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const {url, preview} = req.body;
    const spotId = req.params;
    const newSpotImage = await SpotImage.create({
        url: url,
        preview: preview,
        spotId: spotId
    });
    res.status(200);
    res.json(newSpotImage);
    //err: 404, 'Spot couldn't be found'
});

// #12 ; /:spotId/reviews ; GET
router.get('/:spotId/reviews', async (req, res, next) => {
    const reviewsBySpot = await Review.findAll({where: {spotId: req.params.spotId}});
    res.status(200);
    res.json(reviewsBySpot); //add User, ReviewImages
    //err: 404, 'Spot couldn't be found'
});

// #13 ; /:spotId/reviews ; POST
router.post('/:spotId/reviews', requireAuth, validateData, async (req, res, next) => {
    const {user} = req;
    const userId = user.id;
    const {review, stars} = req.body;
    const newReview = await Review.create({
        userId: userId,
        spotId: req.params.spotId,
        review: review,
        stars: stars
    });
    res.status(201);
    res.json(newReview);
    //err: 404, 'Spot couldn't be found'
    //err: 500, 'User already has a review for this spot'
});

// #18 ; /:spotId/bookings ; GET
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const bookingsBySpot = await Booking.findAll({where: {spotId : req.params.spotId}});
    res.status(200);
    res.json(bookingsBySpot); //add User
});

// #19 ; /:spotId/bookings ; POST
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const {user} = req;
    const userId = user.id;
    const {startDate, endDate} = req.body;
    const spotId = req.params;
    const newBooking = await Booking.create({
        spotId: spotId,
        userId: userId,
        startDate: startDate,
        endDate: endDate
    });
    res.status(200);
    res.json(newBooking);
    //err: 404, 'Spot couldn't be found'
    //err: 403,
    // {
    //     "message": "Sorry, this spot is already booked for the specified dates",
    //     "errors": {
    //       "startDate": "Start date conflicts with an existing booking",
    //       "endDate": "End date conflicts with an existing booking"
    //     }
    // }
});

// #6 ; /:spotId/ ; GET
router.get('/:spotId', async (req, res, next) => {
    const spotToGet = await Spot.findByPk(req.params.spotId);
    res.status(200);
    res.json(spotToGet); //add numReviews, avgStarRating, SpotImages, Owner
    //err: 404, 'Spot couldn't be found'
});

// #9 ; /:spotId/ ; PUT
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const spotToUpdate = await Spot.findByPk(req.params.spotId);
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
    //err: 404, 'Spot couldn't be found'
});

// #10 ; /:spotId/ ; DELETE
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotToDelete = await Spot.destroy({where: {id: req.params.spotId}});
    res.status(200);
    res.json({message: 'Successfully deleted'});
    //err: 404, 'Spot couldn't be found'
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
