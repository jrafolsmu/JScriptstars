const http = require('http');
const fs = require('fs');
const url = require('url');
let path = require('path');
const port = 8000; 
const host = 'localhost';

// Crear nuestro servidor
const server = http.createServer((req, res) => {

    //Url
    let urlc = req.url;  
    console.log("url", urlc)
  
    const myURL = url.parse(urlc);
    console.log("esto es");
    console.log(myURL);
  

    

    
//Enrutado
if (urlc === '/' || urlc === '/login.html'){
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

else if(urlc.includes('model')){
    console.log("path.extname", path.extname);
    urlc = `${__dirname}`+urlc;
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
server.listen(port, host,() =>{
console.log(`Server is running on http://${host}:${port}`);
});