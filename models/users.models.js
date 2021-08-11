const db = require("../db/connection");

exports.selectUsers = () => {
  return db
    .query(
      `SELECT username
      FROM users;`
    )
    .then((results) => {
      //console.log(results.rows);
      return results.rows;
    });
};

exports.selectUsersByUsername = async (req) => {
  const { username } = req.params;
  let usernameOptions = await db
    .query(
      `
    SELECT DISTINCT username
    FROM users;
  `
    )
    .then((result) => {
      return result.rows.map((index) => {
        return index.username;
      });
    });
  if (!usernameOptions.includes(req.params.username)) {
    return Promise.reject({
      status: 404,
      msg: "Not found: username not found",
    });
  }
  return db
    .query(
      `SELECT * FROM users 
      WHERE username = $1;`,
      [username]
    )
    .then((result) => {
      //console.log(result.rows[0]);
      return result.rows[0];
    });
};
