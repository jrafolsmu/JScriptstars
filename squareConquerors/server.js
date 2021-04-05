const http = require('http');
const url = require('url');
const port = 8000; 
const host = 'localhost'

// Crear nuestro servidor
const server = http.createServer((req, res) => {
    //Depuracion
    console.log("req.url", req.url);
    console.log("url.parse", url.parse(req.url));
    //Path
    const path = req.url;  

    //Enrutado
    if (path === '/'){
        res.statusCode = 200;
        res.setHeader = ("Content-type", "text-plain");
        res.end("Hello World");
      
    } else {
        res.writeHead(404); 
        res.end('PAGE NOT FOUND');
    }

    
});
    
//Lanzamos el servidor de forma asincrona
server.listen(port, host,() =>{
    console.log(`Server is running on http://${host}:${port}`);
});