var express = require('express')
let router = express.Router();
const Player = require('./../model/player');

router.route('/')
    .get(async function (req, res) {
        let code, response;
        //encuentra listado de jugadores 
        let players = await Player.find()

        if (players === '') {
            code = 501
            response = {
                error: true,
                message: 'There are not players found'
            };

        } else {
            code = 200
            response = {
                error: false,
                message: "List of players",
                response: players
            };
        }

        res.status(code).send(response);

    })
    //crea un jugador 

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

            if (player != null) {
                code = 503;
                response = {
                    error: true,
                    message: 'This player has already been previously created'
                };
            } else {

                let newPlayer = new Player({
                    username: req.body.username,
                    password: req.body.password,
                    avatar: req.body.avatar
                })

                await newPlayer.save()
                code = 200;
                response = {
                    error: false,
                    message: 'Player created',
                    response: "Player\n" + req.body.username + "\ncreated"
                };

            }

        }

        res.status(code).send(response);
    })

//modifica un jugador

router.route('/:_id')
    .put(async function (req, res) {
        let code, response;

        let player = await Player.findOne({ _id: req.params._id });

        if (!req.body.username || !req.body.password || !req.body.avatar) {
            code = 502;
            response = {
                error: true,
                message: 'All fields are required'
            };

        } else {

            if (player == null) {
                code = 501;
                response = {
                    error: true,
                    message: 'This player has not been created yet'
                };

            } else if (player != null) {

                await Player.updateOne({ _id: req.params._id }, {
                    username: req.body.username,
                    password: req.body.password,
                    avatar: req.body.avatar,
                })
                code = 200;
                response = {
                    error: false,
                    message: 'Player updated',
                    response: player
                };
            }
        }

        res.status(code).send(response);

    })
    .get(async function (req, res) {
        let player = await Player.findOne({ _id: req.params._id });

        if (player == null) {
            res.status(501).send({
                error: true,
                message: 'This player has not been created yet'
            });
        } else {
            res.send({
                error: false,
                message: 'success',
                response: player
            });
        }
    })
    .patch(async function (req, res) {
        let player = await Player.findOne({ _id: req.params._id });

        if (player == null) {
            res.status(501).send({
                error: true,
                message: 'This player has not been created yet'
            });
        } else {

            Player.findByIdAndUpdate(req.params._id, req.body, { new: true }).then((player) => {
                if (!player) {
                    return res.status(404).send();
                }
                res.send({
                    error: false,
                    message: 'Player updated',
                    response: player
                });
            }).catch((error) => {
                res.status(500).send(error);
            })
        }

    })

    .delete(async function (req, res) {
        let code, response;

        let player = await Player.findOne({ _id: req.params._id });

        if (player == null) {
            code = 501;
            response = {
                error: true,
                message: 'This player does not exist'
            };

        } else {
            code = 200;
            response = {
                error: false,
                message: 'Player deleted'
            };

            await Player.deleteOne({ _id: req.params._id });
        }

        res.status(code).send(response);

    });

router.use(function (req, res, next) {
    let code, response;
    response = {
        error: true,
        code: 404,
        message: 'URL not found'
    };

    res.status(404).send(response);

});

module.exports = router