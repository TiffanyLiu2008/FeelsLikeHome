const express = require('express');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// #23 ; /:imageId ; DELETE ; Authen ; Autho
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imageId = Number(req.params.imageId);
    const currReviewImage = await ReviewImage.findByPk(imageId);
    if (!currReviewImage) {
        const err = new Error("Review Image couldn't be found");
        err.status = 404;
        return next(err);
    }
    const reviewId = Number(currReviewImage.reviewId);
    const currReview = await Review.findByPk(reviewId);
    const ownerId = Number(currReview.userId);
    const {user} = req;
    const userId = user.id;
    if(userId !== ownerId) {
        const err = new Error("Forbidden");
        err.status = 404;
        return next(err);
    }
    const imageToDelete = await ReviewImage.destroy({where: {
        id: imageId
    }});
    res.status(200);
    res.json({message: "Successfully deleted"});
});

module.exports = router;
