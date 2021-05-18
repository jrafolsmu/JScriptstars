var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

var playersSchema = new Schema({
  username:     { type: String },
  password:  { type: String },
  avatar:    { type: String, enum:
  ['./images/mickey.jpg', './images/naruto.jpg', './images/goku.jpg', './images/darthVader.png', './images/vegeta.jpg']
        },
});

//Convertir a modelo y exportar
module.exports = mongoose.model('Player', playersSchema);