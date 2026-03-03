const {Router}=require('express');

const authRouter=Router();
// require all the routes here
const authRouter = require('./rotes/auth.routes');

app.use('./api/auth', authRouter);

module.exports=authRouter;