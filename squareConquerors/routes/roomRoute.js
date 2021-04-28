var express = require('express')
var router = express.Router()
const path = require('path');


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/room.html'));
    console.log("room path", path.join(__dirname, '../views/room.html'))
})

module.exports = router