var express = require('express')
var router = express.Router()
const path = require('path');


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/login.html'));
    console.log("login path", path.join(__dirname, '../views/login.html'))
})

module.exports = router