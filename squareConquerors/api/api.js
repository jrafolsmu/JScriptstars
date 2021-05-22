var express = require('express')
var router = express.Router({mergeParams: true})
var players = require('./playersApiRoute')
var auth = require('./auth')
var score = require('./scoreApiRoute')

router.use('/players', players)
router.use('/auth', auth)
router.use('/score', score)


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