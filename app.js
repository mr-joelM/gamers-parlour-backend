const express = require("express");
const apiRouter = require("./routers/api.router");
const cors = require("cors");

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/index");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", () => {
  res.status(404).send({ msg: "wrong request, path does not exist" });
});

// error handling
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;

/*
test file for endpoints.

controllers dir => controllers.fs

models dir => models.fs

routers dir => all folders...




*/
