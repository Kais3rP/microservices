const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./User')
 
  router.post('/register', jsonParser, register);
  router.post('/login', jsonParser, login);
  router.get('/logout', function(req, res) { 
                                            res.status(200).clearCookie("auth_token", {path: "/"}).send({ data: "Logged Out" });
                        }
            );

async function register(req, res, next){
  
  
  try {
        const userDoc = await User.findOne({user: req.body.user}).exec()
        if (userDoc) return res.json({error: "Username Already Taken"})
          
              const emailDoc = await User.findOne({user: req.body.user}).exec()
              if (emailDoc) return res.json({error: "Email Already registered"})
                   let hashedPwd = bcrypt.hashSync(req.body.password, 8); //crpyting pwd
                   let user = new User({user: req.body.user, email: req.body.email, password: hashedPwd});
                   
                     const userDb = await user.save()
                             console.log(userDb)  
                      
                        
                                              
                                 
                                

          
  } catch {
          res.json({error: "Error, please retry"})
          next()
        }
  }
  
  
  async function login (req, res, next){ 
    if ( /auth_token/.test(req.headers.cookie) ) res.send({error: "Already Logged"}); 
    else
     try {
           
           const userDoc = await User.findOne({user: req.body.user}).exec()
           if (!userDoc) return res.status(404).send({error: 'No user found.'}); 
           let passwordIsValid = bcrypt.compareSync(req.body.password, userDoc.password)
           if (!passwordIsValid) return res.status(401).send({ error: 'Wrong Password' }); //password wrong
           
           //if user and password are correct I assign the token
       
        let token = jwt.sign({ id: userDoc._id }, process.env.SECRET, { expiresIn: 86400 } );
        res.status(200).cookie("auth_token", token,{ expires: new Date(Date.now() + 8 * 3600000) }).send({user: userDoc.user}); //I send the cookie with the token to the client
       
     } catch {
               res.status(500).send('Error on the server.');
     }
}

module.exports = router;

