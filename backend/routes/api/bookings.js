const express = require('express');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { Op } = require('sequelize');
const currDate = Date.now();

// #17 ; /current ; GET ; Authen
router.get('/current', requireAuth, async (req, res) => {
    const {user} = req;
    const currBookings = await Booking.findAll({
        where: {userId: user.id},
        include: [
            {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']}
        ]
    });
    res.status(200);
    res.json({'Bookings': currBookings});
});

// #20 ; /:bookingId ; PUT ; Authen ; Autho
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingId = Number(req.params.bookingId);
    const bookingToUpdate = await Booking.findByPk(bookingId);
    if (!bookingToUpdate) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }
    const ownerId = bookingToUpdate.userId;
    const {user} = req;
    const userId = user.id;
    if (userId !== ownerId) {
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
    if (endDate < currDate) {
        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        return next(err);
    }
    const existingBooking = await Booking.findAll({where: {
        spotId: bookingToUpdate.spotId,
        [Op.or]: [
            {
                startDate: { [Op.between]: [startDate, endDate] },
            },
            {
                endDate: { [Op.between]: [startDate, endDate] },
            },
            {
                startDate: { [Op.lt]: startDate },
                endDate: { [Op.gt]: endDate },
            }
        ]
        // startDate: {[Op.lte]: endDate},
        // endDate: {[Op.gte]: startDate}
    }});
    if (existingBooking.length > 0) {
        const err = new Error("Sorry, this spot is already booked for the specified dates");
        err.status = 403;
        err.errors = ["Start date conflicts with an existing booking", "End date conflicts with an existing booking"];
        return next(err);
    }
    bookingToUpdate.startDate = startDate;
    bookingToUpdate.endDate = endDate;
    res.status(200);
    res.json(bookingToUpdate);
});

// #21 ; /:bookingId ; DELETE ; Authen ; Autho
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingId = Number(req.params.bookingId);
    const currBooking = await Booking.findByPk(bookingId);
    if (!currBooking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }
    const bookingOwnerId = currBooking.userId;
    const spotId = currBooking.spotId;
    const currSpot = await Spot.findByPk(spotId);
    const spotOwnerId = currSpot.ownerId;
    const {user} = req;
    const userId = user.id;
    if (userId !== bookingOwnerId && userId !== spotOwnerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }
    if (currBooking.startDate < currDate) {
        const err = new Error("Bookings that have been started can't be deleted");
        err.status = 403;
        return next(err);
    }
    const bookingToDelete = await Booking.destroy({where: {id: bookingId}});
    res.status(200);
    res.json({message: "Successfully deleted"});
});

module.exports = router;
