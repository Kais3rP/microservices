const User = require('./User');

const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/new-user', jsonParser, async function(req,res, next){
  
  try {
        let userDoc = await User.findOne().exec();
        if (userDoc) return res.status(400).send({error: "Username Already Taken"});
       let user = await User.create({user: req.body.user});
    console.log(user);
        res.send(user);
  } catch {
     res.status(400).send({error: "Something went wrong!"})
  }
})

module.exports = router;