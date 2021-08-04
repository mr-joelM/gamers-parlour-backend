const express = require('express');
const {categoriesRouter, reviewsRouter} = require('./index.router');
const apiRouter = express.Router();

apiRouter.route('/')
    .get(()=>{console.log('route found!')});

apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/reviews', reviewsRouter)


module.exports = apiRouter;