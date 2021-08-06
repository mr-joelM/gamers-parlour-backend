const express = require("express");
const {
  getReviews,
  getReviewsById,
  getCommentsByReviewId,
} = require("../controllers/reviews.controllers");
const reviewsRouter = express.Router();

reviewsRouter.route("/").get(getReviews);
reviewsRouter.route("/:review_id").get(getReviewsById);
reviewsRouter.route("/:review_id/comments").get(getCommentsByReviewId);

module.exports = reviewsRouter;
