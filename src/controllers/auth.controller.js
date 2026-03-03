const userModel = require('../models/user.model')


/**
 * @route RegisterUserController
 * @desc Register new User excepts username , email and password in the body of the request
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
}


module.exports = {
    registerUserController
}