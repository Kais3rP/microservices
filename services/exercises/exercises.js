const User = require('./User');

const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();
const urlParser = bodyParser.urlencoded({extended: true});

router.post('/new-user', urlParser, async function(req,res, next){
  console.log(req)
  try {
        let userDoc = await User.findOne({username: req.body.user}).exec();
    
        if (userDoc) return res.status(400).send({error: "Username Already Taken"});
       let user = await User.create({username: req.body.user});
    console.log(user);
        res.send({username: user.username, _id: user._id});
  } catch {
     res.status(400).send({error: "Something went wrong!"})
  }
})
router.get('/users', async function(req,res){
                                       try {
                                            let allUsers = await User.find({}).exec()
                                            res.status(200).send(allUsers)
                                       }
                                         catch {
                                           res.status(400).send({error: "Error"})
                                         }
})

module.exports = router;