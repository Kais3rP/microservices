const User = require('./User');

const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();
const urlParser = bodyParser.urlencoded({extended: true});

router.post('/new-user', urlParser, async function(req,res, next){
  
  try {
        let userDoc = await User.findOne({username: req.body.username}).exec();
        if (userDoc) return res.status(400).send({error: "Username Already Taken"});
        let user = await User.create({username: req.body.username});
        
        res.status(200).json({username: user.username, _id: user._id});
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

router.post('/add', urlParser, async function(req,res, next){
  console.log(req)
  try {
        let userDoc = await User.findOne({_id: req.body.id}).exec();
    console.log(userDoc)
        if (!userDoc) return res.status(400).send({error: "User not found"});
        let userUpdate = await User.update({_id: req.body.id}, {description: req.body.description}, {duration: req.body.duration}, {date: req.body.date ? req.body.date : new Date()}); //{duration: req.body.duration}, {date: req.body.date ? req.body.date : new Date()}
        console.log(userUpdate);
        let user = await User.findOne({_id: req.body.id})
        res.status(200).json(user);
  } catch {
     res.status(400).send({error: "Something went wrong!"})
  }
})
module.exports = router;

function vlaidateDate(date){
  if (/)
}