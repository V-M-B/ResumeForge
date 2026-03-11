const userModel = require('../models/user.model')

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const tokenBlacklistModel = require ('../models/blacklist.model')


/**
 * @route RegisterUserController
 * @desc login a user expects username , email and password in the body of the request
 * @access Public
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email and password' });
    }

    const existingUser = await userModel.findOne({ $or:[{email},{username}] });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    
const hash = await bcrypt.hash(password,10);

const user = await userModel.create({
    username,
    email,
    password: hash
})

const token = jwt.sign(
    {id:user._id,
    username:user.username},
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
)

// set cookie with token for immediate authentication
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}


/**
 * @route loginUserController
 * @desc Register new User excepts username , email and password in the body of the request
 * @access Public
 */


async function loginUserController(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        {id:user._id,
        username:user.username},
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('token', token)
    res.status(200).json({
        message: 'User logged in successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email
            
        }
    });
 }

 /**
 * @route GET api/auth/logout
 * @desc Logout user and clear cookie
 * @access Public
 */
async function logoutUserController(req, res) {
    // ensure cookies are available (cookie-parser middleware must be enabled)
    const token = req.cookies && req.cookies.token;

    if (token) {
        await tokenBlacklistModel.create({ token });
    }

    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
}


/**
 * @route GET api/auth/get-me
 * @desc Get the current login user details 
 * @access Private
 */
async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        id:user._id,
        username:user.username,
        email:user.email
    })

}

module.exports = {
    registerUserController,
    logoutUserController,
    loginUserController,
    getMeController
}