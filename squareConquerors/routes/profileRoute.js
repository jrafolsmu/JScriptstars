var express = require('express')
var router = express.Router()
const path = require('path');


router.get('/', function (req, res) {
    res.render('profile.pug')
    //res.sendFile(path.join(__dirname, '../views/profile.pug'));
    //console.log("login path", path.join(__dirname, '../views/profile.pug'))
})

module.exports = router