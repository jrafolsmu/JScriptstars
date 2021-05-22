const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    player: {
        type: String
    },
    score: {
        type: Number
    },
    room: {
        type: String
    }
});

const Game = mongoose.model('Game', GameSchema)

module.exports = Game;
