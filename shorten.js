module.exports = function (app, parser, mongoose){

 
const util = require('util'); //this is useful to promisify
const dns = require('dns');  //needed to use dns.lookup

//------------------ Start of mongodb settings ----------------------------
  //creates the URL schema
let urlSchema = new mongoose.Schema({
  url: String,
  hash: String
})
var Url = mongoose.model("Url", urlSchema)  //create the model

const lookupAsync = util.promisify(dns.lookup) //promisifies dns.lookup method
  
//------------------------------ End of mongodb settings -------------------
  
  // URL shortner microservice 

    app.post("/api/shorturl", parser, shortenPostCallback )
    app.get('/short/:hash', shortenGetCallback )
  


//POST method callback

const shortenPostCallback = function( req, res, next){
  
      console.log(req)
      var urlStandard = req.body.url;
      let hash = hashCode(urlStandard);
      urlStandard = /^https{0,1}:\/\//.test(urlStandard) ? urlStandard.replace(/^https{0,1}:\/\//,"") : urlStandard; //gets rid of http:// because dns.lookup doesn't support it

      //Looks if it's a valid url
      lookupAsync(urlStandard).then( () => {
        
        let url = new Url({url: urlStandard, hash: hash});
        url.save()
           .catch(err => {throw new Error(err)})  //this saves the document created in the DB and returns a promise
        res.json({hash: hash})
                        })
                      .catch( err => res.json({error: err}))
}

const shortenGetCallback = function( req, res, next ){
  
   let hash = req.params.hash
                                                      Url.findOne({hash: hash})
                                                         .exec()
                                                         .then( doc => {  
                                                                          let finalUrl = doc.url;
                                                                          finalUrl = /^https{0,1}:\/\//.test(finalUrl) ? finalUrl : `http://${finalUrl}`;
                                                                          res.redirect(finalUrl)
                                                                }
                                                          )
}
//Returns an unique hash code by a string
const hashCode = function(str){
  return str.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0).toString().split("").slice(1,4).join("")              
}

//Validates URL format
const validateURL = function (str){
  const urlRegExp = new RegExp(/www\.[A-Z0-9a-z.-]+\.\w+$/);
  return urlRegExp.test(str)
}

}