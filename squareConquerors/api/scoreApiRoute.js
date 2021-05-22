var express = require('express')
let router = express.Router();
const Game = require('../model/game');

router.route('/')
    .get(async function (req, res) {
        let code, response;
        let scores = await Game.find()

        if (!scores) {
            code = 500
            response = {
                error: true,
                message: 'server error'
            };

        } else {
            code = 200
            response = {
                error: false,
                message: "List of score",
                response: scores
            };
        }

        res.status(code).send(response);

    })

    .post(async function (req, res) {
        req.body.data.map(item => {
            const saveData = new Game({
                player: item.user,
                score: item.score,
                room: req.body.room,
            })
            saveData.save();
        })
    })

router.use(function (req, res, next) {
    let response;
    response = {
        error: true,
        message: 'URL not found'
    };

    res.status(404).send(response);

});

module.exports = router