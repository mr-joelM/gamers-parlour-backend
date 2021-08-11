const express = require("express");
const {
  getUsers,
  getUsersByUsername,
} = require("../controllers/users.controllers");
const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUsersByUsername);

module.exports = usersRouter;
