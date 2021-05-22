/*const http = require('http');
const fs = require('fs');
const url = require('url');
let path = require('path');*/


// ExpressJS server
const express = require('express')
const app = express()
const port = 3000
const host = 'localhost'
let path = require('path')
const cors = require('cors');
var loginRoute = require('./loginRoute')
var registerRoute = require('./registerRoute')
var selectroomsRoute = require('./selectroomsRoute')
var profileRoute = require('./profileRoute')
var roomRoute = require('./roomRoute')
var scoreRoute = require('./scoreRoute')
var api =  require('./../api/api')
const mongoose = require('mongoose');

const { joinUser, removeUser, getUsers } = require('./userForChatting');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//Mongo DB connect
mongoose.connect(`mongodb://localhost:27017/square-conquerors`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
    console.log(error);
});

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
app.use("/score.*", scoreRoute);


//Routing API
app.use("/api", api);

//Lanzamos el servidor de forma asincrona
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