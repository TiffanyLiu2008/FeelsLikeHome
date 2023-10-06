const express = require('express');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// #11 ; /current ; GET ; Authen
router.get('/current', requireAuth, async (req, res) => {
    const {user} = req;
    const currReviews = await Review.findAll({
        where: {userId: user.id},
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']},
            {model: ReviewImage, attributes: ['id', 'url']}
        ]
    });
    res.status(200);
    res.json({'Reviews': currReviews});
});

// #14 ; /:reviewId/images ; POST ; Authen ; Autho
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const reviewId = Number(req.params.reviewId);
    const currReview = await Review.findByPk(reviewId);
    if (!currReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }
    const ownerId = currReview.userId;
    const {user} = req;
    const userId = user.id;
    if (userId !== ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }
    const existingReviewImages = await ReviewImage.findAll({where: {
        reviewid: reviewId
    }});
    if (existingReviewImages.length >= 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
        return next(err);
    }
    const {url} = req.body;
    const newReviewImage = await ReviewImage.create({
        url: url,
        reviewId: reviewId
    });
    const returnObj = {
        id: newReviewImage.id,
        url: newReviewImage.url
    };
    res.status(200);
    res.json(returnObj);
});

// #15 ; /:reviewId ; PUT ; Authen ; Autho
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewId = Number(req.params.reviewId);
    const reviewToUpdate = await Review.findByPk(reviewId);
    if (!reviewToUpdate) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }
    const ownerId = reviewToUpdate.userId;
    const {user} = req;
    const userId = user.id;
    if (userId !== ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }
    const {review, stars} = req.body;
    if (review.length === 0 || stars < 1 || stars > 5) {
        const err = new Error("Bad Request");
        err.status = 400;
        err.errors = ["Review text is required", "Stars must be an integer from 1 to 5"];
        return next(err);
    }
    reviewToUpdate.review = review;
    reviewToUpdate.stars = stars;
    res.status(200);
    res.json(reviewToUpdate);
});

// #16 ; /:reviewId ; DELETE ; Authen ; Autho
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewId = Number(req.params.reviewId);
    const currReview = await Review.findByPk(reviewId);
    if (!currReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }
    const ownerId = currReview.userId;
    const {user} = req;
    const userId = user.id;
    if (userId !== ownerId) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }
    const reviewToDelete = await Review.destroy({where: {id: reviewId}});
    res.status(200);
    res.json({message: "Successfully deleted"});
});

module.exports = router;
