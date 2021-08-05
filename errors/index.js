exports.handleCustomErrors = (err, req, res, next)=>{
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
};

exports.handlePsqlErrors = (err, req, res, next)=>{
    if(err.code === '22P02'){
        res.status(400).send({msg: 'Bad Request: wrong type value'})
    } else if(err.code === 'xxxxx'){
        res.status(400).send({msg: 'Bad Request'})
    } else { next(err) }
};

exports.handleServerErrors = (err, req, res, next)=>{
    res.status(500).send({ msg: 'Internal server error' })
};




