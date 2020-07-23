const mongoose = require('mongoose');

//-------------MongoDB Model---------------
  var userSchema = new mongoose.Schema({username: String, description: String, duration: Number, id: String, date: String});
  var User = mongoose.model('UserEx', userSchema)
 //----------------------------------------------------- 
  
  module.exports = User;