const express = require("express");
const {
  getCommentsByCommentId,
  patchCommentsByCommentId,
} = require("../controllers/comments.controllers");
const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").get(getCommentsByCommentId);
commentsRouter.route("/:comment_id").patch(patchCommentsByCommentId);

module.exports = commentsRouter;
