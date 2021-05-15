var express = require('express')
var router = express.Router()

let player1 = {id: 1, username: 'Paco', password: 'Password12345', avatar: "../images/vegeta.jpg"};
let player2 = {id: 2, username: 'Javascripstars', password: 'Password12345', avatar: "../images/mickey.jpg"};
let player3 = {id: 3, username: 'Superman', password: 'Password12345', avatar: "../images/naruto.jpg"};
let players = [player1, player2, player3];

router.route('/')
.get(function (req, res) {

    response = {
        error: false,
        code: 200,
        message: ''
    };

if(players === '') {

    response = {
        error: true,
        code: 501,
        message: 'There are not players found'
    };

} else {
    response = {
        error: false,
        code: 200,
        message: "List of players",
        response: players
    };
  }

    res.send(response);

})

.post(function (req, res) {

    if(!req.body.username) {
        response = {
            error: true,
            code: 502,
            message: 'Username is a required field'
        }

    } else {

        if(players.find(player => player.username == req.body.username)) {
            response = {
                error: true,
                code: 503,
                message: 'This player has already been previously created'
            };
        } else {

        playerNew = {
            id: req.body.id,
            username: req.body.username,
            password: req.body.password,
            avatar: req.body.avatar
        };

        players.push(playerNew);
        response = {
            error: false,
                code: 200,
                message: 'Player created',
                response: playerNew
            };
        }
    }  

    res.send(response);
})


router.route('/:id')
   .put (function (req, res) {

    let playerFound = players.find(player => player.id == req.params.id)

    if(!req.body.username || !req.body.password || !req.body.avatar) {
        
        response = {
            error: true,
            code: 502,
            message: 'All fields are required'
        };
        
    } else {

        if(!playerFound) {
            response = {
                error: true,
                code: 501,
                message: 'This player has not been created yet'
        };

        } else if (playerFound) {

            let id = req.params.id; 
            objIndex = players.findIndex((obj => obj.id == id));
            console.log("Before update: ", players[objIndex])
            players[objIndex].username = req.body.username,
            players[objIndex].password = req.body.password,
            players[objIndex].avatar = req.body.avatar
 
            response = {
                error: false,
                code: 200,
                message: 'Player updated',
                response: playerFound
            };
        }
    }

    res.send(response);

})

.delete(function (req, res) {

    let playerFound = players.find(player => player.id == req.params.id)

    if(!playerFound) {

    response = {
        error: true,
        code: 501,
        message: 'This player does not exist'
    };

    } else {
        response = {
            error: false,
            code: 200,
            message: 'Player deleted'
        };

        let id = req.params.id; 
        objIndex = players.findIndex((obj => obj.id == id));
        console.log("Before delete: ", players[objIndex]);
        players.splice(objIndex, 1);
        console.log("After delete: ", players);
    }

    res.send(response);

   });

   router.use(function(req, res, next) {
        response = {
            error: true, 
            code: 404, 
            message: 'URL not found'
        };

    res.status(404).send(response);

   });

   module.exports = router