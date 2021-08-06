\c nc_games_test
-- psql -f psqlTest.sql > psqlTest.txt


SELECT reviews.*, COUNT (comments) AS comment_count
        FROM reviews 
        LEFT JOIN comments ON reviews.review_id = comments.review_id
        GROUP BY reviews.review_id
        ORDER BY reviews.review_id asc;