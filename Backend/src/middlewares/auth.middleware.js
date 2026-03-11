const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require('../models/blacklist.model');

function authUser(req, res, next) {
    const token = req.cookies && req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const blacklistedToken = tokenBlacklistModel.findOne({ token });

    if (blacklistedToken) {
        return res.status(401).json({ message: 'Access denied. Token is blacklisted.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}

module.exports = { authUser };


