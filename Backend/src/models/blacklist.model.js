const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required:[true, " Token is required to be added in the black list "]
    }
    },
    {
        timestamps: true
    }
);

const tokenBlacklistModel = mongoose.model('BlacklistTokens', blacklistSchema);

module.exports = tokenBlacklistModel;