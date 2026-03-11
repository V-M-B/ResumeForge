const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
// populate req.cookies
app.use(cookieParser());



// require all the routes here
const authRouter = require('./route/auth.routes');


// using all the routes here 
app.use('/api/auth', authRouter);

module.exports = app;
