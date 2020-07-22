const User = require('./User');

const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();
const urlParser = bodyParser.urlencoded({extended: false});

router.post('/new-user', urlParser, async function(req,res, next){
  console.log(req)
  try {
        let userDoc = await User.findOne({user: req.body.user}).exec();
    
        if (userDoc) return res.status(400).send({error: "Username Already Taken"});
       let user = await User.create({user: req.body.user});
    console.log(user);
        res.send(user);
  } catch {
     res.status(400).send({error: "Something went wrong!"})
  }
})

module.exports = router;