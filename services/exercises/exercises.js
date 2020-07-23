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
  console.log(req.body)
  try {
        let userDoc = await User.findOne({_id: req.body.userId}).exec();
   
        if (!userDoc) return res.status(400).send({error: "User not found"});
        let userUpdate = await User.update({_id: req.body.userId}, {description: req.body.description,
                                                                    duration: req.body.duration,
                                                                    date: validateDate(req.body.date),
                                                                    $push : {exercises: { description: req.body.description,  //$push in mongoose is an atomic method that lets you add mutiple entries in an array during an update
                                                                                          duration: req.body.duration,
                                                                                          date: validateDate(req.body.date)
                                                                                        }
                                                                            }
                                                                   }); 
       userDoc = await User.findOne({_id: req.body.userId}).exec();
       
        res.status(200).send({username: userDoc.username, description: userDoc.description, duration: userDoc.duration, _id: userDoc._id, date: userDoc.date});
  } catch {
     res.status(400).send({error: "Something went wrong!"})
  }
})


router.get('/log', async function(req,res){
  
                                       try {
                                            let userDoc = await User.findOne({_id: req.query.userId}).exec();
                                            if (!userDoc) return res.status(400).send({error: "User not found"});
                                         
                                            res.status(200).send({_id: userDoc._id, username: userDoc.username, count: userDoc.exercises.length, log: userDoc.exercises});
                                       }
                                         catch {
                                           res.status(400).send({error: "Error"})
                                         }
})


module.exports = router;

function validateDate(date){
  if (/\d\d\d\d-\d\d-\d\d/.test(date)) return new Date(date).toDateString()
  return new Date().toDateString()
}
