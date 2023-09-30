const express = require('express');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

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
    const {startDate, endDate} = req.body;
    const bookingToUpdate = await Booking.findByPk(req.params.bookingId);
    bookingToUpdate.startDate = startDate;
    bookingToUpdate.endDate = endDate;
    res.status(200);
    res.json(bookingToUpdate);
    //err: 404, 'Booking couldn't be found'
    //err: 403, 'Past bookings can't be modified', past end date
    //err: 403,
    // {
    //     "message": "Sorry, this spot is already booked for the specified dates",
    //     "errors": {
    //       "startDate": "Start date conflicts with an existing booking",
    //       "endDate": "End date conflicts with an existing booking"
    //     }
    //   }
});

// #21 ; /:bookingId ; DELETE
router.delete('/bookingId', requireAuth, async (req, res, next) => {
    const bookingToDelete = await Booking.destroy({where: {id: req.params.bookingId}});
    res.status(200);
    res.json({message: 'Successfully deleted'});
    //err: 404, 'Booking couldn't be found'
    //err: 403, 'Bookings that have been started can't be deleted', past start date
});

module.exports = router;
