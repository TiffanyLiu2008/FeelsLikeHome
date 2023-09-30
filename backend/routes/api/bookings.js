const express = require('express');
const { Booking } = require('../../db/models');
const router = express.Router();

// /current ; GET
router.get('/current', (req, res) => {
    const currBookings = await Booking.findAll({
        where: {userId: } //? add auth
    });
    res.json(currBookings); //how to include Spot?
});

// /:bookingId ; PUT
router.put('/:bookingId', (req, res) => {
    const {startDate, endDate} = req.body;
    const bookingToUpdate = await Booking.findByPk(req.params.bookingId);
    bookingToUpdate.startDate = startDate;
    bookingToUpdate.endDate = endDate;
    res.json(bookingToUpdate); //add auth
});

// /:bookingId ; DELETE
router.delete('/bookingId', (req, res) => {
    const bookingToDelete = await Booking.findByPk(req.params.bookingId); //how to delete?
    res.json({message: 'Successfully deleted'}); //add auth
});

module.exports = router;
