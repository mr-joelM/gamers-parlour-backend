\c nc_games

-- CREATE TABLE categories (
--         slug VARCHAR(40) UNIQUE PRIMARY KEY,
--         description TEXT NOT NULL
--       );

-- CREATE TABLE users (
--         username VARCHAR(40) UNIQUE PRIMARY KEY,
--         avatar_url TEXT,
--         name VARCHAR(55) NOT NULL
--       );

-- CREATE TABLE reviews (
--         review_id SERIAL PRIMARY KEY,
--         title VARCHAR(55) NOT NULL,
--         review_body TEXT NOT NULL,
--         designer VARCHAR(55) NOT NULL,
--         review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
--         votes INT DEFAULT 0,
--         category VARCHAR(40) REFERENCES categories(slug),
--         owner VARCHAR(40) REFERENCES users(username) NOT NULL,
--         created_at DATE DEFAULT NOW()
--       );

-- CREATE TABLE comments (
--         comment_id SERIAL PRIMARY KEY,
--         author VARCHAR(40) REFERENCES users(username),
--         review_id INT REFERENCES reviews(review_id),
--         votes INT DEFAULT 0,
--         created_at DATE DEFAULT NOW(),
--         body TEXT NOT NULL
--       );







SELECT * FROM categories;

SELECT * FROM reviews;

SELECT * FROM comments;

SELECT * FROM users;

-- psql -f output.sql > output.txt