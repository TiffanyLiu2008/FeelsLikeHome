const express = require('express');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// #11 ; /current ; GET
router.get('/current', requireAuth, async (req, res) => {
    const {user} = req;
    const currUser = await User.findByPk(user.id);
    const currReviews = await currUser.getReviews();
    res.status(200);
    res.json(currReviews); //add User, Spot, ReviewImages
});

// #23 ; /:reviewId/images/:imageId ; DELETE
router.delete('/:reviewId/images/:imageId', requireAuth, async (req, res, next) => {
    const currReviewImage = await ReviewImage.findAll({where: {
        id: req.params.imageId,
        reviewId: req.params.reviewId
    }});
    if (currReviewImage) {
        const err = new Error("Review Image couldn't be found");
        err.status = 404;
        return next(err);
    }
    const imageToDelete = await ReviewImage.destroy({where: {
        id: req.params.imageId,
        reviewId: req.params.reviewId
    }});
    res.status(200);
    res.json({message: 'Successfully deleted'});

});

// #14 ; /:reviewId/images ; POST
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const currReview = await Review.findByPk(req.params.reviewId);
    if (!currReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }
    const existingReviewImages = await ReviewImage.findAll({where: {
        reviewid: req.params.reviewId
    }});
    if (existingReviewImages.length >= 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
        return next(err);
    }
    const {url} = req.body;
    const newReviewImage = await ReviewImage.create({
        url: url,
        reviewId: req.params.reviewId
    });
    res.status(200);
    res.json(newReviewImage);
});

// #15 ; /:reviewId ; PUT
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewToUpdate = await Review.findByPk(req.params.reviewId);
    if (!reviewToUpdate) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }
    const {review, stars} = req.body;
    reviewToUpdate.review = review;
    reviewToUpdate.stars = stars;
    res.status(200);
    res.json(reviewToUpdate);
});

// #16 ; /:reviewId ; DELETE
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const currReview = await Review.findByPk(req.params.reviewId);
    if (!currReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }
    const reviewToDelete = await Review.destroy({where: {id: req.params.reviewId}});
    res.status(200);
    res.json({message: 'Successfully deleted'});
});

module.exports = router;
