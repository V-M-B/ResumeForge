const userModel = require('../models/user.model')

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');



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

res.status(201).json({
    message: 'User registered successfully',
})
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



module.exports = {
    registerUserController,
    loginUserController
}