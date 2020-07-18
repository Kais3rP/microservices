module.exports = function submitUser (app, parser, mongoose){
  //-------------MongoDB Model---------------
  var userSchema = new mongoose.Schema({user: String, password: String});
  var UserModel = mongoose.model('User', userSchema)
 //----------------------------------------------------- 
  app.post('/api/register', parser, register)
  app.get('/api/login', parser, login)

async function register(req, res, next){
  
  try {
        
        const userDoc = await UserModel.findOne({user: req.body.user}).exec()
        
        if (userDoc) res.json({error: "Username Already Taken"})
        else { 
        
        let user = new UserModel({user: req.body.user, password: req.body.password});
         user.save()
                    .then( ()=> res.json({ data: "Successfully Registered"}) )
                    .catch( (err) => res.json ({ data : "Something went wrong"}))
          
        } 
  } catch {
          res.json({error: "Error, please retry"})
        }
  
  }
  
  
  async function login (req, res, next){ 

     try {
       const userDoc = await UserModel.findOne({user: req.body.user, password: req.body.password}).exec()
       console.log(userDoc)
       res.json({user: userDoc.user})
       
     } catch {
       
       
     }



}
}

