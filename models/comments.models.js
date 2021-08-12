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
