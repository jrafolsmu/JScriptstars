var express = require('express')
var router = express.Router()
const path = require('path');
// const Player = require('./../db/model/Player')


router.get('/', function (req, res) {
    res.render('register.pug');
    //res.sendFile(path.join(__dirname, '../views/register.pug'));
    //console.log("register path", path.join(__dirname, '../views/register.pug'))
})

module.exports = router