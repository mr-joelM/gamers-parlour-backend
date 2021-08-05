const express = require('express');
const {getReviews, getReviewsById} = require('../controllers/reviews.controllers')
const reviewsRouter = express.Router();


reviewsRouter.route('/')
    .get(getReviews);
reviewsRouter.route('/:review_id')
    .get(getReviewsById);


module.exports = reviewsRouter;