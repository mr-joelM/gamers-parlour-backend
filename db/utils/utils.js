const db = require("../connection");
const format = require("pg-format");

exports.checkIfExist = async (table, column, value) => {
  const queryFormated = format(
    `SELECT * FROM %I WHERE %I = $1;`,
    table,
    column
  );
  await db.query(queryFormated, [value]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found: query not found" });
    }
  });
};
