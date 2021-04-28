var express = require('express')
var router = express.Router()
const path = require('path');


router.get('/' , function (req, res) {
    res.sendFile(path.join(__dirname, '../views/register.html'));
    console.log("register path", path.join(__dirname, '../views/register.html'))
})

module.exports = router