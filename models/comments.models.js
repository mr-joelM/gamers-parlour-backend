const db = require("../db/connection");

exports.selectCommentsByCommentId = async (req) => {
  const { comment_id } = req.params;

  let commentIdOptions = await db
    .query(
      `
    SELECT DISTINCT comment_id
    FROM comments;
  `
    )
    .then((result) => {
      //console.log(result.rows, "<==result.rows");
      return result.rows.map((index) => {
        return index.comment_id;
      });
    });
  //console.log(typeof commentIdOptions[0], "<=commentIdOptions");
  //console.log(typeof req.params.comment_id, "<=req.params.comment_id");
  if (!commentIdOptions.includes(parseInt(req.params.comment_id))) {
    return Promise.reject({
      status: 404,
      msg: "Not found: comment id not found",
    });
  }
  return db
    .query(
      `SELECT *
          FROM comments 
          WHERE comment_id = $1;`,
      [comment_id]
    )
    .then((result) => {
      const comment = result.rows[0];
      //console.log(comment);
      return comment;
    });
};

exports.updateCommentsByCommentId = async (req) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  //console.log(comment_id, "<==>", inc_votes);

  let commentIdOptions = await db
    .query(
      `
    SELECT DISTINCT comment_id
    FROM comments;
  `
    )
    .then((result) => {
      //console.log(result.rows, "<==result.rows");
      return result.rows.map((index) => {
        return index.comment_id;
      });
    });
  //console.log(typeof commentIdOptions[0], "<=commentIdOptions");
  //console.log(typeof req.params.comment_id, "<=req.params.comment_id");
  if (!commentIdOptions.includes(parseInt(req.params.comment_id))) {
    return Promise.reject({
      status: 404,
      msg: "Not found: comment id not found",
    });
  }

  return db
    .query(
      `UPDATE comments
    SET votes = votes + $1
    WHERE comment_id = $2
    RETURNING*;`,
      [inc_votes, comment_id]
    )
    .then((result) => {
      //console.log(result.rows[0]);
      return result.rows[0];
    });
};

exports.eraseCommentsByCommentId = async (req) => {
  const { comment_id } = req.params;

  let commentIdOptions = await db
    .query(
      `
    SELECT DISTINCT comment_id
    FROM comments;
  `
    )
    .then((result) => {
      //console.log(result.rows, "<==result.rows");
      return result.rows.map((index) => {
        return index.comment_id;
      });
    });
  //console.log(typeof commentIdOptions[0], "<=commentIdOptions");
  //console.log(typeof req.params.comment_id, "<=req.params.comment_id");
  if (!commentIdOptions.includes(parseInt(req.params.comment_id))) {
    return Promise.reject({
      status: 404,
      msg: "Not found: comment id not found",
    });
  }

  return db
    .query(
      `DELETE FROM comments
    WHERE comment_id = $1;`,
      [comment_id]
    )
    .then((result) => {
      return result;
    });
};
