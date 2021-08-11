const db = require("../db/connection");
const reviews = require("../db/data/test-data/reviews");

exports.selectReviews = async (req) => {
  const { sorted_by = "created_at" } = req.query;
  const { order = "DESC" } = req.query;
  const { category } = req.query;
  /// sorted_by filtering
  const sortOptions = [
    `owner`,
    `title`,
    `review_id`,
    `category`,
    `review_img_url`,
    `created_at`,
    `votes`,
    `comment_count`,
    undefined,
  ];
  if (!sortOptions.includes(req.query.sorted_by)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request: Invalid sort query",
    });
  }
  /// order filtering
  const orderOptions = ["asc", "desc", undefined];
  if (!orderOptions.includes(req.query.order)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request: Invalid order query",
    });
  }
  /// category filtering
  let categoryOptions = await db
    .query(
      `
    SELECT DISTINCT category
    FROM reviews;
  `
    )
    .then((result) => {
      return result.rows.map((index) => {
        return index.category;
      });
    });
  categoryOptions.push(undefined);
  //console.log(categoryOptions, "<= categoryOptions");
  if (!categoryOptions.includes(req.query.category)) {
    return Promise.reject({
      status: 400,
      msg: "Bad request: Invalid category query",
    });
  }

  let reviewsTable = `
  SELECT reviews.*, COUNT (comments) AS comment_count
  FROM reviews 
  LEFT JOIN comments ON reviews.review_id = comments.review_id `;

  if (req.query.category != undefined) {
    reviewsTable += `WHERE reviews.category = '${category}' `;
  }

  reviewsTable += ` GROUP BY reviews.review_id
        ORDER BY ${sorted_by} ${order} ;`;

  //console.log(req.query, "<= req.query");
  //console.log(reviewsTable, "<= reviewsTable");

  return db.query(reviewsTable).then((results) => {
    //console.log(results.rows, results.rows.length);
    const reviews = results.rows;
    return reviews;
  });
};

exports.selectReviewsById = ({ review_id }) => {
  return db
    .query(
      `SELECT reviews.*, COUNT (comments) AS comment_count
        FROM reviews 
        LEFT JOIN comments ON reviews.review_id = comments.review_id
        WHERE reviews.review_id = $1
        GROUP BY reviews.review_id;`,
      [review_id]
    )
    .then((result) => {
      const review = result.rows[0];
      //console.log(review);
      return review;
    });
};

exports.selectCommentsByReviewId = async (req) => {
  const { review_id } = req.params;
  let maxIdNum = await db
    .query(
      `
      SELECT MAX (review_id)
      FROM reviews
    `
    )
    .then((result) => {
      return result.rows[0]["max"];
    });
  //console.log(req.params, " <= req.params");
  //console.log(maxIdNum, " <= maxIdNum");
  if (review_id > maxIdNum) {
    return Promise.reject({
      status: 404,
      msg: "Not found: id number does not exist",
    });
  }

  return db
    .query(
      `SELECT * FROM comments
      WHERE comments.review_id= ${review_id};`
    )
    .then((result) => {
      const comments = result.rows;
      //console.log(comments);
      return comments;
    });
};

exports.addCommentsByReviewId = (req) => {
  const { review_id } = req.params;
  const { username, body } = req.body;
  //console.log(review_id);
  //console.log(username, body);

  return db
    .query(
      `
    INSERT INTO comments
    (review_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING*;`,
      [review_id, username, body]
    )
    .then((result) => {
      //console.log(result.rows[0]);
      return result.rows[0];
    });
};
