const {
  selectReviews,
  selectReviewsById,
  updateReviewsById,
  selectCommentsByReviewId,
  addCommentsByReviewId,
} = require("../models/reviews.models");

exports.getReviews = (req, res, next) => {
  selectReviews(req)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      //console.log(err, "<= *CATCH ERROR*");
      next(err);
    });
};

exports.getReviewsById = (req, res, next) => {
  const reviewId = req.params;
  selectReviewsById(reviewId)
    .then((review) => {
      if (review === undefined) {
        next({ status: 404, msg: "Not found: id number does not exist" });
      } else {
        res.status(200).send({ review });
      }
    })
    .catch((err) => {
      //console.log(err, "<= *CATCH ERROR*");
      next(err);
    });
};

exports.patchReviewsById = (req, res, next) => {
  updateReviewsById(req)
    .then((updatedVote) => {
      res.status(200).send({ updatedVote });
    })
    .catch((err) => {
      //console.log(err, "<= *CATCH ERROR*");
      next(err);
    });
};

exports.getCommentsByReviewId = (req, res, next) => {
  selectCommentsByReviewId(req)
    .then((comments) => {
      //console.log({ comments }, "<= comments");
      res.status(200).send({ comments });
    })
    .catch((err) => {
      //console.log(err, "<= *CATCH ERROR*");
      next(err);
    });
};

exports.postCommentsByReviewId = (req, res, next) => {
  //console.log("in controllers");
  addCommentsByReviewId(req)
    .then((newComment) => {
      res.status(201).send({ newComment });
    })
    .catch((err) => {
      //console.log(err, "<= *CATCH ERROR*");
      next(err);
    });
};
