var express = require('express')
var router = express.Router()
const path = require('path');


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/selectrooms.html'));
    console.log("selectrooms path", path.join(__dirname, '../views/selectrooms.html'))
})

router.post('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/selectrooms.html'));
    console.log("selectrooms path", path.join(__dirname, '../views/selectrooms.html'))
})

module.exports = router