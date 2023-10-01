const express = require('express');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const currDate = Date.now();

// #17 ; /current ; GET
router.get('/current', requireAuth, async (req, res) => {
    const {user} = req;
    const currUser = await User.findByPk(user.id);
    const currBookings = await currUser.getBookings();
    res.status(200);
    res.json(currBookings); //add Spot
});

// #20 ; /:bookingId ; PUT
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingId = Number(req.params.bookingId);
    const bookingToUpdate = await Booking.findByPk(bookingId);
    if (!bookingToUpdate) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }
    const {requestedStartDate, requestedEndDate} = req.body;
    if (requestedEndDate < currDate) {
        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        return next(err);
    }
    const existingBooking = await Booking.findAll({where: {
        spotId: Number(req.params.spotId),
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
    bookingToUpdate.startDate = requestedStartDate;
    bookingToUpdate.endDate = requestedEndDate;
    res.status(200);
    res.json(bookingToUpdate);
});

// #21 ; /:bookingId ; DELETE
router.delete('/bookingId', requireAuth, async (req, res, next) => {
    const bookingId = Number(req.params.bookingId);
    const currBooking = await Booking.findByPk(bookingId);
    if (!currBooking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }
    if (currBooking.startDate > currDate ) {
        const err = new Error("Bookings that have been started can't be deleted");
        err.status = 403;
        return next(err);
    }
    const bookingToDelete = await Booking.destroy({where: {id: bookingId}});
    res.status(200);
    res.json({message: 'Successfully deleted'});
});

module.exports = router;
