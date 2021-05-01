var express = require('express')
var router = express.Router()
const path = require('path');


router.get('/', function (req, res) {
    res.render('selectrooms.pug');
    //res.sendFile(path.join(__dirname, '../views/selectrooms.pug'));
    //console.log("selectrooms path", path.join(__dirname, '../views/selectrooms.pug'))
})

router.post('/', function (req, res) {
    res.render('selectrooms.pug');
    //res.sendFile(path.join(__dirname, '../views/selectrooms.pug'));
    //console.log("selectrooms path", path.join(__dirname, '../views/selectrooms.pug'))
})

module.exports = router