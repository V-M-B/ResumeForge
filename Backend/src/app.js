const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

// using cors for cross origin resource sharing 
app.use(cors({
    origin: 'http://localhost:5173', // allow requests from this origin
    credentials: true, // allow cookies to be sent with requests

}))

app.use(express.json());
// populate req.cookies
app.use(cookieParser());



// require all the routes here
const authRouter = require('./route/auth.routes');


// using all the routes here 
app.use('/api/auth', authRouter);

module.exports = app;
