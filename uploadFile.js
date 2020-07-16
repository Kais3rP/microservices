module.exports = function(app){
  
  const multer = require('multer'); //multer is a middleware that parses bodies of POST with multi-part/formdata
  const upload = multer({dest: 'uploads/'}) //this sets the destination for the files to parse
  
  app.post('/api/upload', upload.single('file'), function( req, res, next){         //single() method of multer parses a single file
    console.log(req.file)
    
  })
  
}