const mongoose = require('mongoose');

//-------------MongoDB Model---------------
  var userSchema = new mongoose.Schema({user: String, id: String});
  var User = mongoose.model('UserEx', userSchema)
 //----------------------------------------------------- 
  
  module.exports = User;