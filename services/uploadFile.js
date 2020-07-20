const express = require ('express');
const router = express.Router();
const multer = require('multer'); //multer is a middleware that parses bodies of POST with multi-part/formdata
const fs = require('fs'); //needed to delete the file uploaded once done
const util = require('util');
const jwt = require('jsonwebtoken')
  
const asyncRemove = util.promisify(fs.unlink)
const upload = multer({dest: 'uploads/'}) //this sets the destination for the files to parse
  
  router.post('/', upload.single('file'), function(req, res, next){   //single() method of multer parses a single file, the paramater it takes is the name of the file specified in form input
   if (!req.headers.cookie) return res.status(401).send({ error: "Log In or Register, to access the service"});
   let decodedToken = jwt.verify(/(?<=auth_token=).*/.exec(req.headers.cookie)[0], process.env.SECRET);
   if (!decodedToken) return res.status(401).send({ error: "Log In or Register, to access the service"});
   else {
    res.json(req.file)
    asyncRemove(req.file.path).then( val => console.log(val) ).catch( err => console.log(err)) //deletes the file once the server responded
   }
  })  


module.exports = router;