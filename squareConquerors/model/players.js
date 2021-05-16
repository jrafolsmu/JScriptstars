var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

var playersSchema = new Schema({
  id:    { type: Number },
  username:     { type: String },
  password:  { type: String },
  avatar:    { type: String, enum:
  ['mickey.jpg', 'naruto.jpg', 'goku.jpg', 'darthVader.jpg', 'vegeta.jpg']
        },
});

//Convertir a modelo y exportar
module.exports = mongoose.model('Player', playersSchema);