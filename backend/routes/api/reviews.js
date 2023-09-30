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
    const imageToDelete = await ReviewImage.destroy({where: {
        id: req.params.imageId,
        reviewId: req.params.reviewId
    }});
    res.status(200);
    res.json({message: 'Successfully deleted'});
    //err: 404, 'Spot Image couldn't be found'
});

// #14 ; /:reviewId/images ; POST
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const {url} = req.body;
    const reviewId = req.params;
    const newReviewImage = await ReviewImage.create({
        url: url,
        reviewId: reviewId
    });
    res.status(200);
    res.json(newReviewImage);
    //err: 404, 'Review couldn't be found'
    //err: 403, 'Maximum number of images for this resource was reached', max 10 per post
});

// #15 ; /:reviewId ; PUT
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const {review, stars} = req.body;
    const reviewToUpdate = await Review.findByPk(req.params.reviewId);
    reviewToUpdate.review = review;
    reviewToUpdate.stars = stars;
    res.status(200);
    res.json(reviewToUpdate);
    //err: 404, 'Review couldn't be found'
});

// #16 ; /:reviewId ; DELETE
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewToDelete = await Review.destroy({where: {id: req.params.reviewId}});
    res.status(200);
    res.json({message: 'Successfully deleted'});
    //err: 404, 'Review couldn't be found'
});

module.exports = router;
