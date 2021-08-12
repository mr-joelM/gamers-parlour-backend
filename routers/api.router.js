const express = require("express");
const {
  categoriesRouter,
  reviewsRouter,
  commentsRouter,
  usersRouter,
} = require("./index.router");
const apiRouter = express.Router();
const fs = require("fs/promises");

apiRouter.route("/").get(async (req, res) => {
  const endPointFile = await fs
    .readFile(`${__dirname}/../endpoints.json`, "utf8")
    .then((endPointFile) => {
      return JSON.parse(endPointFile);
    });
  res.status(200).send(endPointFile);
});

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
