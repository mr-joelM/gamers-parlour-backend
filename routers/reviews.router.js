const express = require("express");
const {
  getReviews,
  getReviewsById,
  patchReviewsById,
  getCommentsByReviewId,
  postCommentsByReviewId,
} = require("../controllers/reviews.controllers");
const reviewsRouter = express.Router();

reviewsRouter.route("/").get(getReviews);
reviewsRouter.route("/:review_id").get(getReviewsById);
reviewsRouter.route("/:review_id").patch(patchReviewsById);
reviewsRouter.route("/:review_id/comments").get(getCommentsByReviewId);
reviewsRouter.route("/:review_id/comments").post(postCommentsByReviewId);

module.exports = reviewsRouter;
