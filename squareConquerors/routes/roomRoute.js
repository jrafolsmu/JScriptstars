var express = require('express')
var router = express.Router()
const path = require('path');


router.get('/', function (req, res) {
    res.render('room.pug');
    //res.sendFile(path.join(__dirname, '../views/room.pug'));
    //console.log("room path", path.join(__dirname, '../views/room.pug'))
})

module.exports = router