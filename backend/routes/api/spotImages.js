const express = require('express');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// #22 ; /:imageId ; DELETE ; Authen ; Autho
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imageId = req.params.imageId;
    if (imageId === 'null') {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }
    imageId = Number(imageId);
    const currSpotImage = await SpotImage.findByPk(imageId);
    const spotId = Number(currSpotImage.spotId);
    const currSpot = await Spot.findByPk(spotId);
    const ownerId = Number(currSpot.ownerId);
    const {user} = req;
    const userId = user.id;
    if (userId !== ownerId) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }
    if (!currSpotImage) {
        const err = new Error("Spot Image couldn't be found");
        err.status = 404;
        return next(err);
    }
    const imageToDelete = await SpotImage.destroy({where: {
        id: imageId
    }});
    res.status(200);
    res.json({message: 'Successfully deleted'});
});

module.exports = router;
