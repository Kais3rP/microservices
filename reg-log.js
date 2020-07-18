module.exports = function submitUser (app, parser, mongoose){
  //-------------MongoDB Model---------------
  var userSchema = new mongoose.Schema({user: String, password: String});
  var UserModel = mongoose.model('User', userSchema)
 //----------------------------------------------------- 
  app.post('/api/register', parser, register)


async function register(req, res, next){
  
  try {
        console.log(req.body.user)
        const userDoc = await UserModel.findOne({name: req.body.user}).exec()
        console.log(userDoc)
        if (userDoc) res.json({error: "Username Already Taken"})
        else { 
        
        let user = new UserModel({user: req.body.user, password: req.body.password});
         user.save()
                    .then( ()=> res.json({ data: "Successfully Registered"}) )
                    .catch( (err) => res.json ( data => "Something went wrong"))
          res.sendFile(__dirname + "/views/index.html");
        } 
  } catch {
          res.json({error: "Error, please retry"})
        }
  
  }
}