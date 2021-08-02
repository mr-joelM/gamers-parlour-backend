// extract any functions you are using to manipulate your data, into this file
exports.formatCategoriesData = (array) => {
  const newArr = array.map(({ slug, description }) => [slug, description]);
  return newArr;
};

exports.formatUsersData = (array) => {
  const newArr = array.map(({ username, name, avatar_url }) => [
    username,
    name,
    avatar_url,
  ]);
  return newArr;
};

exports.formatReviewsData = (array) => {
  const newArr = array.map(
    ({
      title,
      review_body,
      designer,
      review_img_url,
      votes,
      category,
      owner,
      created_at,
    }) => [
      title,
      review_body,
      designer,
      review_img_url,
      votes,
      category,
      owner,
      created_at,
    ]
  );
  return newArr;
};

exports.formatCommentsData = (commentsData, reviewsData) => {
  const newArray = commentsData.map(
    ({ body, belongs_to, created_by, votes, created_at }) => {
      const { review_id } = reviewsData.find(
        (review) => review.title === belongs_to
      );
      return [created_by, review_id, votes, created_at, body];
    }
  );
  return newArray;
};
