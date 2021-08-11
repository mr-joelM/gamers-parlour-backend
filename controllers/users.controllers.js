const {
  selectUsers,
  selectUsersByUsername,
} = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((allUsersUsernames) => {
      res.status(200).send({ allUsersUsernames });
    })
    .catch((err) => {
      //console.log(err, "<= *CATCH ERROR*");
      next(err);
    });
};

exports.getUsersByUsername = (req, res, next) => {
  selectUsersByUsername(req)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      console.log(err, "<= *CATCH ERROR*");
      next(err);
    });
};
