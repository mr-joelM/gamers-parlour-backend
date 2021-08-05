const {selectReviews, selectReviewsById} = require('../models/reviews.models')

exports.getReviews = (req, res, next) =>{
    selectReviews().then((reviews)=>{
        res.status(200).send({reviews})
    }).catch ((err) => {next(err)});
}

exports.getReviewsById = (req, res, next) => {
    const reviewId = req.params;
    selectReviewsById(reviewId).then((review)=>{
        
        if(review === undefined){
            next({status:400, msg: 'wrong id number'})
        }else{
            res.status(200).send({review})
        }
    }).catch ((err) => {
        //console.log(err)
        next(err)});
};

