const express = require('express');
const {getReviewsById} = require('../controllers/reviews.controllers')
const reviewsRouter = express.Router();

reviewsRouter.route('/:review_id')
    .get(getReviewsById);


module.exports = reviewsRouter;