const express = require('express');
const {categoriesRouter} = require('./index.router');
const apiRouter = express.Router();

apiRouter.route('/')
    .get(()=>{console.log('route found!')});

apiRouter.use('/categories', categoriesRouter)


module.exports = apiRouter;