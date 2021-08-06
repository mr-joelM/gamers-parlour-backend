const {selectReviews, selectReviewsById} = require('../models/reviews.models')

exports.getReviews = (req, res, next) =>{
    selectReviews(req).then((reviews)=>{
        res.status(200).send({reviews})
    }).catch ((err) => {console.log(err, '<= *CATCH ERROR*')
        next(err)});
}

exports.getReviewsById = (req, res, next) => {
    const reviewId = req.params;
    selectReviewsById(reviewId).then((review)=>{
        
        if(review === undefined){
            next({status:404, msg: 'Bad request, id number does not exist'})
        }else{
            res.status(200).send({review})
        }
    }).catch ((err) => {
        //console.log(err)
        next(err)});
};

