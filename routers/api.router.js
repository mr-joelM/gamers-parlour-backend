const express = require("express");
const {
  categoriesRouter,
  reviewsRouter,
  commentsRouter,
  usersRouter,
} = require("./index.router");
const apiRouter = express.Router();

apiRouter.route("/").get(() => {
  console.log("route found!");
});

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
