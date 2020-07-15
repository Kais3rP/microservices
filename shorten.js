module.exports = function (app, parser, mongoose){
  
/*const util = require('util'); //this is useful to promisify
const dns = require('dns');  //needed to use dns.lookup
  //creates the URL schema
let urlSchema = new mongoose.Schema({
  url: String
})
  
const lookupAsync = util.promisify(dns.lookup)*/
  

  
  // URL shortner microservice 
app.post("/api/shorturl/new", parser, (req, res, next) => { 
  res.json({hash: "hello"});
  /*var url = req.body.url;
  url = /^https{0,1}:\/\//.test(url) ? url.replace(/^https{0,1}:\/\//,"") : url;
  
  console.log(url)
  
  lookupAsync(url).then( () => {
    
    console.log(url)
    
    let hash = hashCode(url);
    
   console.log(hash);
    
    res.send("hello");
    
    app.get(`/api/shorturl/${hash}`, (req,res,next) => res.redirect(url)) 
                             })
    .catch( err => res.send({error: err}))*/
    })
}


//Returns an unique hash code by a string
const hashCode = function(str){
  return str.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0).toString().split("").slice(1,4).join("")              
}

//Validates URL format
const validateURL = function (str){
  const urlRegExp = new RegExp(/http:\/\/www\.[A-Z0-9a-z.-]+\.\w+$/);
  return urlRegExp.test(str)
}