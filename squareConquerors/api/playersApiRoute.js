var express = require('express')
var router = express.Router({mergeParams: true})
var mongoose = require('mongoose');
const { db } = require('../model/players');
var Player  = mongoose.model('Player');
var players = require('../model/players');
const { post } = require('../routes/loginRoute');

/*let player1 = {id: 1, username: 'Paco', password: 'Password12345', avatar: "../images/vegeta.jpg"};
let player2 = {id: 2, username: 'Javascripstars', password: 'Password12345', avatar: "../images/mickey.jpg"};
let player3 = {id: 3, username: 'Superman', password: 'Password12345', avatar: "../images/naruto.jpg"};
let players = [player1, player2, player3];*/


router.route('/')
.get(async function (req, res) {

//encuentra listado de jugadores 
let players = await Player.find()

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
//crea un jugador 

.post(async function (req, res) {

    if(!req.body.username) {
        response = {
            error: true,
            code: 502,
            message: 'Username is a required field'
        }

    } else {

        let player = await Player.findOne({username: req.body.username});

        if(player != null) {
            response = {
                error: true,
                code: 503,
                message: 'This player has already been previously created'
            };
        /*if(players.find(player => player.username == req.body.username)) {
            response = {
                error: true,
                code: 503,
                message: 'This player has already been previously created'
            };*/

        } else {

            let newPlayer = new Player({
                username: req.body.username,
                password: req.body.password,
                avatar: req.body.avatar
            })

            await newPlayer.save()
            /*players.push(playerNew);*/
            response = {
                error: false,
                code: 200,
                message: 'Player created',
                response: "Player\n" + req.body.username + "\ncreated"
            };
        
        }  
    
    }

    res.send(response);
})

//modifica un jugador

router.route('/:_id')
   .put (async function (req, res) {

    let player = await Player.find({_id: req.params._id});

    if(!req.body.username || !req.body.password || !req.body.avatar) {
        
        response = {
            error: true,
            code: 502,
            message: 'All fields are required'
        };
        
    } else {

        if(player == null) {
            response = {
                error: true,
                code: 501,
                message: 'This player has not been created yet'
            };

        } else if (player != null) {

            await Player.updateOne({_id: req.params._id}, {
                username: req.body.username,
                password: req.body.password,
                avatar: req.body.avatar,
            })

            response = {
                error: false,
                code: 200,
                message: 'Player updated',
                response: player
            };

           
            
            /*objIndex = players.findIndex((obj => obj.id == id));
            console.log("Before update: ", players[objIndex])
            players[objIndex].username = req.body.username,
            players[objIndex].password = req.body.password,
            players[objIndex].avatar = req.body.avatar*/
 
           
        }
    }

    res.send(response);

})

.delete(async function (req, res) {

    let player = await Player.find({_id: req.params._id});

    if(player == null) {

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

        await Player.deleteOne({_id: req.params._id});
        /*let id = req.params.id; 
        objIndex = players.findIndex((obj => obj.id == id));
        console.log("Before delete: ", players[objIndex]);
        players.splice(objIndex, 1);
        console.log("After delete: ", players);*/
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