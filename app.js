const express = require('express');
const apiRouter = require('./routers/api.router');
const app = express();


app.use('/api', apiRouter)









app.all('*', ()=>{
    console.log('request made!')
})

module.exports = app;

/*
test file for endpoints.

controllers dir => controllers.fs

models dir => models.fs

routers dir => all folders...

error folders..


*/