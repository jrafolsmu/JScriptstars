var express = require('express')
var router = express.Router()
var players = require('./playersApiRoute')

router.use('/players', players)


let response = {
    error: false,
    code: 200, 
    message: ""
};

router.get('/', function(req, res) {

    response = {
        error: true,
        code: 200,
        message: 'Estás conectado a nuestra API'
    };

    res.send(response);

});

module.exports = router