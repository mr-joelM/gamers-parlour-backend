const express = require("express");
const {
  getCommentsByCommentId,
  patchCommentsByCommentId,
  deleteCommentsByCommentId,
} = require("../controllers/comments.controllers");
const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").get(getCommentsByCommentId);
commentsRouter.route("/:comment_id").patch(patchCommentsByCommentId);
commentsRouter.route("/:comment_id").delete(deleteCommentsByCommentId);
module.exports = commentsRouter;
