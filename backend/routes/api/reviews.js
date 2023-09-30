const express = require('express');
const { Review } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const router = express.Router();

// /current ; GET
router.get('/current', (req, res) => {
    const currReviews = await Review.findAll({
        where: {userId : } //? add auth
    });
    res.json(currReviews); //how to include User, Spot, ReviewImages?
});

// /:reviewId/images/:imageId ; DELETE
router.delete('/:reviewId/images/:imageId', (req, res) => {
    const reviewId = req.params.reviewId; //how to use?
    const imageId = req.params.imageId;
    const imageToDelete = await ReviewImage.findByPk(req.params.imageId); //how to delete?
    res.json({message: 'Successfully deleted'}); //add auth
});

// /:reviewId/images ; POST
router.post('/:reviewId/images', (req, res) => {
    const {url} = req.body;
    const reviewId = req.params;
    const newReviewImage = await ReviewImage.build({url}); //how to link to review?
    await newReviewImage.save();
    res.json({data: newReviewImage}); //add auth
});

// /:reviewId ; PUT
router.put('/:reviewId', (req, res) => {
    const {review, stars} = req.body;
    const reviewToUpdate = await Review.findByPk(req.params.reviewId);
    reviewToUpdate.review = review;
    reviewToUpdate.stars = stars;
    res.json(reviewToUpdate); //add auth
});

// /:reviewId ; DELETE
router.delete('/:reviewId', (req, res) => {
    const reviewToDelete = await Review.findByPk(req.params.reviewId); //how to delete?
    res.json({message: 'Successfully deleted'}); //add auth
});

module.exports = router;
