/*const http = require('http');
const fs = require('fs');
const url = require('url');
let path = require('path');*/


// ExpressJS server
const express = require('express')
const bodyParser = require('body-parser'); // dependencia adicional para el manejo de datos en la recepción
const methodOverride = require("method-override");
const app = express()
const port = 3000
const host = 'localhost'

var mongoose = require('mongoose');
require('../model/players');
require('../data/players');
let path = require('path')
var loginRoute = require('./loginRoute')
var registerRoute = require('./registerRoute')
var selectroomsRoute = require ('./selectroomsRoute')
var profileRoute = require ('./profileRoute')
var roomRoute = require ('./roomRoute')
var api = require('../api/api')
var playersApiRoute = require('../api/playersApiRoute')




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


/*let player1 = {id: 1, username: 'Paco', password: 'Password12345', avatar: "../images/vegeta.jpg"};
let player2 = {id: 2, username: 'Javascripstars', password: 'Password12345', avatar: "../images/mickey.jpg"};
let player3 = {id: 3, username: 'Superman', password: 'Password12345', avatar: "../images/naruto.jpg"};
let players = [player1, player2, player3];


let response = {
    error: false,
    code: 200, 
    message: ""
};

app.get('/api', function(req, res) {

    response = {
        error: true,
        code: 200,
        message: 'Estás conectado a nuestra API'
    };

    res.send(response);

});*/

/*
app.route('/api/players')
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


app.route('/api/players/:id')
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

   app.use(function(req, res, next) {
        response = {
            error: true, 
            code: 404, 
            message: 'URL not found'
        };

    res.status(404).send(response);

   });
*/

const { joinUser, removeUser, getUsers } = require('./userForChatting');


// Se indica el directorio donde se almacenarán las plantillas 
app.set('views', './views');
//Set engine to pug
app.set('view engine', 'pug');

//Load static files in public directory
app.use(express.static(path.join(__dirname, '../public')));

console.log(path.join(__dirname, '../public'), "static path")

//Routing login, register, selectrooms, profile, room
app.use("/", loginRoute);
app.use("/login.*", loginRoute);
app.use("/register.*", registerRoute);
app.use("/selectrooms.*", selectroomsRoute);
app.use("/profile.*", profileRoute);
app.use("/room.*", roomRoute);

//Routing API
app.use("/api", api);
app.use("/api/players.*", playersApiRoute);


//Lanzamos el servidor de forma asincrona y añadimos conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/squareConquerors', {useNewUrlParser: true, useUnifiedTopology: true},

function(err, res) {
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
    server = app.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });

    
// my socket
//socket.io instantiation
const io = require("socket.io")(server, {
    allowEIO3: true // false by default
})

//listen on every connection
io.on('connection', (socket) => {

    socket.on('join room', async function (data) {
        const users = getUsers(data.roomname)
        if (users.length >= 4) {
            socket.emit('error message', { error: 'cannot join', message: 'You can not join this room! Try again later.' });
        }
        else {
            let newuser = await joinUser(socket.id, data.username, data.roomname, users.length)
            socket.emit('send user data', newuser);

            socket.join(newuser.roomname);
            const userList = await getUsers(newuser.roomname)
            io.in(newuser.roomname).emit("user list", userList);
        }
    })
    socket.on("chat message", (data) => {
        io.to(data.roomname).emit("chat message", { data: data, id: socket.id });
    });

    socket.on("key press", (data) => {
        io.to(data.user.roomname).emit("key press", data);
    });

    socket.on("new game", (data) => {
        io.in(data.roomname).emit("new game");
    })
    socket.on("game start", (data) => {
        const users = getUsers(data.roomname)
        io.to(data.socketID).emit("game start", users);
    });

    socket.on("game end", (data) => {
        io.to(data.roomname).emit("game end", data);
    });

    //user disconnect
    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        console.log(user);
        if (user) {
            console.log(user.username + ' has left');
            io.in(user.roomname).emit("user disconnected", user.socketID);
        }
        console.log("disconnected");

    });

    ////
    socket.on("display snake1", (data) => {
        io.in(data.room).emit("display snake1", data);
    });

    socket.on("display snake2", (data) => {
        io.in(data.room).emit("display snake2", data);
    });

    socket.on("display snake3", (data) => {
        io.in(data.room).emit("display snake3", data);
    });

    socket.on("display snake4", (data) => {
        io.in(data.room).emit("display snake4", data);
    });

    //apple
    socket.on("create apple", (data) => {
        io.in(data.room).emit("create apple", { appleIndex: data.appleIndex, appleIndex2: data.appleIndex2 });
    })

    socket.on("eat apple", (data) => {
        io.in(data.room).emit("eat apple", data);
    })
})
});




/* Crear nuestro servidor
const server = http.createServer((req, res) => {

    //Url
    let urlc = req.url;
    console.log("url", urlc)

    const myURL = url.parse(urlc);
    console.log("esto es");
    console.log(myURL);*/

//Enrutado


/*if (urlc === '/' || urlc === '/login.html'){
    urlc = "/login.html"
    urlc = `${__dirname}/public`+urlc;
    fs.readFile(urlc, 'utf8', (err, data) =>{
        if (err){
            res.writeHead(404);
            res.end('PAGE NOT FOUND');
        } else {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        }
    });
}

else if(urlc === '/register.html'){
    urlc = `${__dirname}/public`+urlc;
    fs.readFile(urlc, 'utf8', (err, data) =>{
        if (err){
            res.writeHead(404);
            res.end('PAGE NOT FOUND');
        } else {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        }
    });
}
else if(urlc === '/selectrooms.html'){
    urlc = `${__dirname}/public`+urlc;
    fs.readFile(urlc, 'utf8', (err, data) =>{
        if (err){
            res.writeHead(404);
            res.end('PAGE NOT FOUND');
        } else {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        }
    });
}

else if(urlc === '/profile.html'){
    urlc = `${__dirname}/public`+urlc;
    fs.readFile(urlc, 'utf8', (err, data) =>{
        if (err){
            res.writeHead(404);
            res.end('PAGE NOT FOUND');
        } else {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        }
    });
}

else if(myURL.pathname==='/room.html'){
    urlc = `${__dirname}/public`+myURL.pathname;
    fs.readFile(urlc, 'utf8', (err, data) =>{
        if (err){
            res.writeHead(404);
            res.end('PAGE NOT FOUND');
        } else {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        }
    });

}



else if(urlc.includes('styles')){
    urlc = `${__dirname}`+urlc;
    fs.readFile(urlc, 'utf8', (err, data) =>{
        if (err){
            res.writeHead(404);
            res.end('PAGE NOT FOUND');
        } else {
            res.writeHead(200, {"Content-Type": "text/css"});
            res.end(data);
        }

    });

}

else if(urlc.includes('images')){
    urlc = `${__dirname}`+urlc;
    fs.readFile(urlc, (err, data) =>{
        if (err){
            res.writeHead(404);
            res.end('PAGE NOT FOUND');
        } else {
            res.writeHead(200, {"Content-Type": "image/png"});
            res.end(data);
        }

    });
}

if(urlc.includes('model')||urlc.includes('logic')){
    console.log("path.extname", path.extname);
    urlc = `${__dirname}cle`+urlc;
    console.log("urlc", urlc);
    fs.readFile(urlc, (err, data) =>{
        if (err){
            res.writeHead(404);
            res.end('PAGE NOT FOUND');
        } else {
            res.writeHead(200, {"Content-Type": "text/javascript"});
            res.end(data);
        }

    });
}


});

//Lanzamos el servidor de forma asincrona
server.listen(port,() =>{
console.log(`Server is running on http://${host}:${port}`);
});*/