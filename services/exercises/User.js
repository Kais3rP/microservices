const mongoose = require('mongoose');

//-------------MongoDB Model---------------
  var userSchema = new mongoose.Schema({username: String, exercises: [{description: String, duration: Number, date: String}] });
  var User = mongoose.model('UserEx', userSchema)
 //----------------------------------------------------- 
  
  module.exports = User;