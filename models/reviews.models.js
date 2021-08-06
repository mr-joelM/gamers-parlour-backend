const db = require("../db/connection");
const reviews = require("../db/data/test-data/reviews");

exports.selectReviews = (req) => {
  const {
    sorted_by = "created_at",
    order = "desc",
    category = "reviews.category",
  } = req.query;
  return db
    .query(
      `SELECT reviews.*, COUNT (comments) AS comment_count
        FROM reviews 
        LEFT JOIN comments ON reviews.review_id = comments.review_id
        WHERE reviews.category = ${category}
        GROUP BY reviews.review_id
        ORDER BY ${sorted_by} ${order};`
    )
    .then((results) => {
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

exports.selectCommentsByReviewId = (req) => {
  const { review_id } = req.params;
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
