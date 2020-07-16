module.exports = function(app){
  
  const multer = require('multer'); //multer is a middleware that parses bodies of POST with multi-part/formdata
  const fs = require('fs'); //needed to delete the file uploaded once done
  const util = require('util');
  const asyncRemove = util.promisify(fs.unlink)
  
  const upload = multer({dest: 'uploads/'}) //this sets the destination for the files to parse
  
  app.post('/api/upload', upload.single('upfile'), function(req, res, next){   //single() method of multer parses a single file, the paramater it takes is the name of the file specified in form input
    res.json(req.file)
    asyncRemove(req.file.path).then( val => console.log(val) ).catch( err => console.log(err)) //deletes the file once the server responded
    
    
  })
  
}