const http = require('http');
const fs = require('fs');
const url = require('url');
let path = require('path');
const port = 8000; 
const host = 'localhost';

// Crear nuestro servidor
const server = http.createServer((req, res) => {

    //Url
    let url = req.url;  
    console.log("url", url)
    

    //Enrutado
    if (url === '/' || url === '/login.html'){
        url = "/login.html"
        url = `${__dirname}/public`+url; 
        fs.readFile(url, 'utf8', (err, data) =>{
            if (err){
                res.writeHead(404); 
                res.end('PAGE NOT FOUND');
            } else {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(data);
            }
        });
    }

    else if(url === '/register.html'){
        url = `${__dirname}/public`+url; 
        fs.readFile(url, 'utf8', (err, data) =>{
            if (err){
                res.writeHead(404); 
                res.end('PAGE NOT FOUND');
            } else {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(data);
            }
        });
    }

    else if(url.includes('styles')){
        url = `${__dirname}`+url;
        fs.readFile(url, 'utf8', (err, data) =>{
            if (err){
                res.writeHead(404); 
                res.end('PAGE NOT FOUND');
            } else {
                res.writeHead(200, {"Content-Type": "text/css"});
                res.end(data);
            }

        });

    }

    else if(url.includes('images')){
        url = `${__dirname}`+url;
        fs.readFile(url, (err, data) =>{
            if (err){
                res.writeHead(404); 
                res.end('PAGE NOT FOUND');
            } else {
                res.writeHead(200, {"Content-Type": "image/png"});
                res.end(data);
            }

        });
    }

    else if(path.extname === '.js'){
        url = `${__dirname}`+url;
        fs.readFile(url, (err, data) =>{
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