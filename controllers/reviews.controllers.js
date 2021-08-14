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
      if (reviews.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not found: no review found",
        });
      }
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      //console.log(err, "<= *CATCH ERROR*");
      next(err);
    });
};

exports.getReviewsById = (req, res, next) => {
  selectReviewsById(req)
    .then((review) => {
      res.status(200).send({ review });
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
      if (comments.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not found: query not found",
        });
      }
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
