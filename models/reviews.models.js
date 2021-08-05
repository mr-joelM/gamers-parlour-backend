const db = require('../db/connection');
const reviews = require('../db/data/test-data/reviews');

exports.selectReviews = ()=>{
    return db.query('SELECT * FROM reviews')
    .then((results)=>{
        const reviews = results.rows
        return reviews;
    });
}

exports.selectReviewsById = ({review_id}) => {
    return db.query(
        `SELECT * FROM reviews 
        WHERE review_id = $1;`,[review_id]
    ).then((result)=>{
        const review = result.rows[0]
        //console.log(review)
        return review;
    });
    
}