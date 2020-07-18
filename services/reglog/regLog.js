const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./User')
 
  router.post('/register', jsonParser, register);
  router.post('/login', jsonParser, login);

async function register(req, res, next){
  
  try {
        const userDoc = await User.findOne({user: req.body.user}).exec()
        if (userDoc) return res.json({error: "Username Already Taken"})
          
              const emailDoc = await User.findOne({user: req.body.user}).exec()
              if (emailDoc) return res.json({error: "Email Already registered"})
              
                   let user = new User({user: req.body.user, email: req.body.email, password: req.body.password});
                   user.save()
                              .then( ()=> res.json({ data: "Successfully Registered"}) )
                              .catch( (err) => res.json ({ data : "Something went wrong"})) 
              
          
  } catch {
          res.json({error: "Error, please retry"})
          next()
        }
  }
  
  
  async function login (req, res, next){ 

     try {
           const userDoc = await User.findOne({user: req.body.user, password: req.body.password}).exec()
           if (userDoc) res.json({user: userDoc.user})
           else { res.json({error: "Wrong user or password"}) }
     } catch {
               res.json({error: "Error, please retry"})
     }
}

module.exports = router;
