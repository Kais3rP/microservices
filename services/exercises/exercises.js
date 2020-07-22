const User = require('./User');

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/new-user', jsonParser, async function(req,res, next){
  
  try {
        let userDoc = await User.findOne().exec();
        if (userDoc) return res.send({error: "Username Already Taken"})
        User.create({user: req.body.user})
  } catch {
    
  }
})