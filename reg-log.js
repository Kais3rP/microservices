module.exports = function submitUser (app, parser, mongoose){
  //-------------MongoDB Model---------------
  var userSchema = new mongoose.Schema({user: String, password: String});
  var UserModel = mongoose.model('User', userSchema({}))
 //----------------------------------------------------- 
  app.post('/api/register', parser, register)


function register(req, res, next){
  
  let User = new UserModel({user: req.body.user, password: req.body.password});
  User.findOne()
  console.log(req.body)
  
  
  }
}