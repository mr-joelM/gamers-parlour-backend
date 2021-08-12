const db = require("../db/connection");

exports.selectCategories = () => {
  return db.query("SELECT * FROM categories;").then((results) => {
    const categories = results.rows;
    return categories;
  });
};
