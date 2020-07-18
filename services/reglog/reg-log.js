const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('./User')
 
  router.post('/register', parser, register);
  router.post('/login', parser, login);

async function register(req, res, next){
  
  try {
        
        const userDoc = await User.findOne({user: req.body.user}).exec()
        
        if (userDoc) res.json({error: "Username Already Taken"})
        else { 
        
        let user = new User({user: req.body.user, password: req.body.password});
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
       const userDoc = await User.findOne({user: req.body.user, password: req.body.password}).exec()
       console.log(userDoc)
       if (userDoc) res.json({user: userDoc.user})
       else { res.json({error: "Wrong user or password"}) }
       
       
     } catch {
       
          res.json({error: "Error, please retry"})
     }



}

module.exports = router;

