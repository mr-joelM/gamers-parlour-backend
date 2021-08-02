const db = require('../connection');
const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;

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
    await db.query('DROP TABLE IF EXISTS comments;');
    await db.query('DROP TABLE IF EXISTS reviews;');
    await db.query('DROP TABLE IF EXISTS users;');
    await db.query('DROP TABLE IF EXISTS categories;');
    console.log('all tables dropped')
  // 1. create tables
    await db.query(`
      CREATE TABLE categories (
        slug VARCHAR(40) PRIMARY KEY,
        description TEXT NOT NULL
      );
    `)
    console.log('table categories created')

  // 2. insert data
};

module.exports = seed;
