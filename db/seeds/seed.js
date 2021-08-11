const format = require("pg-format");
const db = require("../connection");
const {
  formatCategoriesData,
  formatUsersData,
  formatReviewsData,
  formatCommentsData,
} = require("../utils/data-manipulation");
const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;

  /* THE OLD WAY! */
  // return db
  //   .query('DROP TABLE IF EXISTS comments;')
  //   .then(()=>{
  //     return db.query('DROP TABLE IF EXISTS reviews;')
  //   })
  //   .then(()=>{
  //     return db.query('DROP TABLE IF EXISTS users;')
  //   })
  //   .then(()=>{
  //     return db.query('DROP TABLE IF EXISTS categories;')
  //   })
  //   .then(()=>{// 1. create tables
  //     console.log('all tables dropped')
  //   })

  await db.query("DROP TABLE IF EXISTS comments;");

  await db.query("DROP TABLE IF EXISTS reviews;");

  await db.query("DROP TABLE IF EXISTS users;");

  await db.query("DROP TABLE IF EXISTS categories;");

  console.log("All tables dropped");

  // 1. create tables
  await db.query(`
      CREATE TABLE categories (
        slug VARCHAR(40) UNIQUE PRIMARY KEY,
        description TEXT NOT NULL
      );
    `);

  await db.query(`
      CREATE TABLE users (
        username VARCHAR(40) UNIQUE PRIMARY KEY,
        avatar_url TEXT,
        name VARCHAR(55) NOT NULL
      );
    `);

  await db.query(`
      CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        title VARCHAR(55) NOT NULL,
        review_body TEXT NOT NULL,
        designer VARCHAR(55) NOT NULL,
        review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        votes INT DEFAULT 0,
        category VARCHAR(40) REFERENCES categories(slug),
        owner VARCHAR(40) REFERENCES users(username) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()NOT NULL
      );
    `);

  await db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(40) REFERENCES users(username),
        review_id INT REFERENCES reviews(review_id),
        votes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()NOT NULL,
        body TEXT NOT NULL
      );
    `);

  console.log("All table created");

  // 2. insert data
  const formattedCategoriesData = formatCategoriesData(categoryData);
  const categoriesInsertString = format(
    `
      INSERT INTO categories
      (slug, description)
      VALUES
      %L
      RETURNING *;
    `,
    formattedCategoriesData
  );
  const categoriesTable = await db.query(categoriesInsertString);
  // console.log(categoriesTable.rows);

  const formattedUsersData = formatUsersData(userData);
  const usersInsertString = format(
    `
      INSERT INTO users
      (username, name , avatar_url)
      VALUES
      %L
      RETURNING *;
    `,
    formattedUsersData
  );
  const usersTable = await db.query(usersInsertString);
  //console.log(usersTable.rows)

  const formattedReviewsData = formatReviewsData(reviewData);
  const reviewsInsertString = format(
    `
    INSERT INTO reviews
    (title, review_body, designer, review_img_url, votes, category, owner, created_at)
    VALUES
      %L
      RETURNING *;
    `,
    formattedReviewsData
  );
  const reviewsTable = await db.query(reviewsInsertString);
  //console.log(reviewsTable.rows)

  const formattedCommentsData = formatCommentsData(
    commentData,
    reviewsTable.rows
  );
  const commentsInsertString = format(
    `
    INSERT INTO comments
    (author, review_id, votes, created_at, body)
    VALUES
      %L
      RETURNING *;
    `,
    formattedCommentsData
  );
  const commentsTable = await db.query(commentsInsertString);
  //console.log(commentsTable.rows);
};

module.exports = seed;
