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
  let hashedPwd = bcrypt.hashSync(req.body.password, 8); //crpyting pwd
  
  try {
        const userDoc = await User.findOne({user: req.body.user}).exec()
        if (userDoc) return res.json({error: "Username Already Taken"})
          
              const emailDoc = await User.findOne({user: req.body.user}).exec()
              if (emailDoc) return res.json({error: "Email Already registered"})
              
                   let user = new User({user: req.body.user, email: req.body.email, password: hashedPwd});
                   
                     const userDb = await user.save()
                             console.log(userDb)  
    
                        let token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 86400 } );
                        res.status(200).send({ data: "Registration Success", auth: true, token: token })
                                              
                                 
                                

          
  } catch {
          res.json({error: "Error, please retry"})
          next()
        }
  }
  
  
  async function login (req, res, next){ 

     try {
           const userDoc = await User.findOne({user: req.body.user}).exec()
           if (!userDoc) return res.status(404).send('No user found.'); 
           let passwordIsValid = bcrypt.compareSync(req.body.password, userDoc.password)
           if (!passwordIsValid) return res.status(401).send({ auth: false, token: null }); //password wrong
           
           //if user and password are correct I assign the token
       
         let token = jwt.sign({ id: userDoc._id }, process.env.SECRET, {expiresIn: 86400});//expires in 24h
    console.log(userDoc.user)
    res.status(200).send({ auth: true, token: token, user: userDoc.user });
       
     } catch {
               res.status(500).send('Error on the server.');
     }
}

module.exports = router;

