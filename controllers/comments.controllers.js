const {
  selectCommentsByCommentId,
  updateCommentsByCommentId,
  eraseCommentsByCommentId,
} = require("../models/comments.models");

exports.getCommentsByCommentId = (req, res, next) => {
  selectCommentsByCommentId(req)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      //console.log(err, "<= *CATCH ERROR*");
      next(err);
    });
};

exports.patchCommentsByCommentId = (req, res, next) => {
  updateCommentsByCommentId(req)
    .then((updatedComment) => {
      res.status(200).send({ updatedComment });
    })
    .catch((err) => {
      //console.log(err, "<= *CATCH ERROR*");
      next(err);
    });
};

exports.deleteCommentsByCommentId = (req, res, next) => {
  eraseCommentsByCommentId(req)
    .then((erasedComment) => {
      res.status(204).send(erasedComment);
    })
    .catch((err) => {
      //console.log(err, "<= *CATCH ERROR*");
      next(err);
    });
};
