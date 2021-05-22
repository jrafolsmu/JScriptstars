var express = require('express')
let router = express.Router();
const Player = require('./../model/player');

router.route('/')
    .post(async function (req, res) {
        let code, response;
        if (!req.body.username) {
            code = 502;
            response = {
                error: true,
                message: 'Username is a required field'
            }

        } else {

            let player = await Player.findOne({ username: req.body.username });

            if (player == null) {
                code = 503;
                response = {
                    error: true,
                    message: 'This player is not registered. Please register first in order to play the game!'
                };
            } else {
                if (req.body.password === player.password) {
                    code = 200;
                    response = {
                        error: false,
                        message: 'login success',
                        response: player
                    };
                } else {
                    code = 503;
                    response = {
                        error: false,
                        message: 'The password you have introduced in not correct. Please, try again.'
                    };
                }

            }

        }

        res.status(code).send(response);

    })
module.exports = router