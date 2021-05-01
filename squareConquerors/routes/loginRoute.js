var express = require('express')
var router = express.Router()
const path = require('path');


router.get('/', function (req, res) {
    res.render('login.pug');
    //res.sendFile(path.join(__dirname, '../views/login.pug'));
    //console.log("login path", path.join(__dirname, '../views/login.pug'))
})

module.exports = router