const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    favoriteRoom: {
        type: String,
    }
});

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player;
