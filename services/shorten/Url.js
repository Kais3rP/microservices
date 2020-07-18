const mongoose = require('mongoose')
//------------------ Start of mongodb settings ----------------------------
  //creates the URL schema
let urlSchema = new mongoose.Schema({
  url: String,
  hash: String
})
var Url = mongoose.model("Url", urlSchema)  //create the model

module.exports = Url;