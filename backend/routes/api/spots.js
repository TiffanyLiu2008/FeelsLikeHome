const express = require('express');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { Booking } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const router = express.Router();

// /current ; GET
router.get('/current', (req, res) => {
    const currSpots = await Spot.findAll({
        where: {ownerId: } //? add auth
    });
    res.json(currSpots);
});

// /:spotId/images/:imageId ; DELETE
router.delete('/:spotId/images/:imageId', (req, res) => {
    const spotId = req.params.spotId; //how to use?
    const imageId = req.params.imageId;
    const imageToDelete = await SpotImage.findByPk(req.params.imageId); //how to delete?
    res.json({message: 'Successfully deleted'}); //add auth
});

// /:spotId/images ; POST
router.post('/:spotId/images', (req, res) => {
    const {url, preview} = req.body;
    const spotId = req.params;
    const newSpotImage = await SpotImage.build({url, preview}); //how to link to spot?
    await newSpotImage.save();
    res.json({data: newSpotImage}); //add auth
});

// /:spotId/reviews ; GET
router.get('/:spotId/reviews', (req, res) => {
    const spotId = req.params;
    const reviewsBySpot = await Review.findAll({
        where: {spotId : spotId} //?
    });
    res.json(reviewsBySpot); //how to include User, ReviewImages?
});

// /:spotId/reviews ; POST
router.post('/:spotId/reviews', (req, res) => {
    const {review, stars} = req.body;
    const userId = ; //?
    const spotId = req.params;
    const newReview = await Review.build({userId, spotId, review, stars});
    await newReview.save();
    res.json(newReview); //add auth
});

// /:spotId/bookings ; GET
router.get('/:spotId/bookings', (req, res) => {
    const spotId = req.params;
    const bookingsBySpot = await Booking.findAll({
        where: {spotId : spotId} //? add auth
    });
    res.json(bookingsBySpot); //how to include User?
});

// /:spotId/bookings ; POST
router.post('/:spotId/bookings', (req, res) => {
    const {startDate, endDate} = req.body;
    const spotId = req.params;
    const userId = ; //?
    const newBooking = await Booking.build({spotId, userId, startDate, endDate});
    await newBooking.save();
    res.json(newBooking); //add auth
});

// /:spotId/ ; GET
router.get('/:spotId', (req, res) => {
    const spotToGet = await Spot.findByPk(req.params.spotId);
    res.json(spotToGet); //how to include SpotImages?
});

// /:spotId/ ; PUT
router.put('/:spotId', (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const spotToUpdate = await Spot.findByPk(req.params.spotId);
    spotToUpdate.address = address; //any smarter way?

    res.json(spotToUpdate); //add auth
});

// /:spotId/ ; DELETE
router.delete('/:spotId', (req, res) => {
    const spotToDelete = await Spot.findByPk(req.params.spotId); //how to delete?
    res.json({message: 'Successfully deleted'}); //add auth
});

// / ; GET
router.get('/', (req, res) => {
    const allSpots = await Spot.findAll();
    res.json(allSpots);
});


// / ; POST
router.post('/', (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const newSpot = await Spot.build({address, city, state, country, lat, lng, name, description, price});
    await newSpot.save();
    res.json({data: newSpot}); //add auth
});

module.exports = router;
