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
var loginRoute = require('./loginRoute')
var registerRoute = require('./registerRoute')
var selectroomsRoute = require ('./selectroomsRoute')
var profileRoute = require ('./profileRoute')
var roomRoute = require ('./roomRoute')

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


//Lanzamos el servidor de forma asincrona
app.listen(port, host,() =>{
    console.log(`Server is running on http://${host}:${port}`);
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