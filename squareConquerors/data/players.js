var mongoose = require('mongoose')
var Player  = mongoose.model('Player');

Player.findOne({ username: "Paco" }, function (err, found) {
    if(err) console.log(err);
    if(found){
        console.log("Initial players have already been created");

    }else{
        try {
            Player.insertMany( [
               { username: "Paco", password: 'Password12345', avatar: "vegeta.jpg" },
               { username: "JScripstars", password: 'Password12345', avatar: "mickey.jpg"},
               { username: "Superman", password: 'Password12345', avatar:"naruto.jpg" }
            ] );
         } catch (e) {
            console.log (e);
         }
    }
});




/*
let player1 = new Player({
    id: 1, 
    username: 'Paco', 
    password: 'Password12345', 
    avatar: "../images/vegeta.jpg"});

let player2 = new Player({
    id: 2, 
    username: 'Javascripstars', 
    password: 'Password12345', 
    avatar: "../images/mickey.jpg"});

let player3 = new Player({
    id: 3, 
    username: 'Superman', 
    password: 'Password12345', 
    avatar: "../images/naruto.jpg"});


player1.save((err, newplayer) => {
        console.log (err, newplayer);
})

player2.save((err, newplayer) => {
    console.log (err, newplayer);
})

player3.save((err, newplayer) => {
    console.log (err, newplayer);
})
*/       