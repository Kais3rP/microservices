module.exports = function submitUser (app, parser, mongoose){
  
  let userSchema = new mongoose.Schema({user: String, password: String});
  let UserModel = mongoose.model('')
  
  app.post('/api/register', parser, register)
}

function register(req, res, next){
  
  console.log(req.body)
  
  
}