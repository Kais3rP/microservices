module.exports = function (app, parser, mongoose){
  
const util = require('util'); //this is useful to promisify
const dns = require('dns');  //needed to use dns.lookup
  const 
  
  app.use(bodyParser.urlencoded({extended: false}));
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

    app.post("/api/shorturl", parser, (req, res, next) => { 
      
      var urlStandard = req.body.url;
      let hash = hashCode(urlStandard);
      urlStandard = /^https{0,1}:\/\//.test(urlStandard) ? urlStandard.replace(/^https{0,1}:\/\//,"") : urlStandard; //gets rid of http:// because dns.lookup doesn't support it

      lookupAsync(urlStandard).then( () => {
        
        let url = new Url({url: urlStandard, hash: hash});
        url.save()
           .then(res => console.log(res) )
           .catch(err => {throw new Error(err)})  //this saves the document created in the DB and returns a promise
        res.json({hash: hash})
          /*let hash = hashCode(url);
          res.json({hash: hash});
          url = url = /^https{0,1}:\/\//.test(url) ? url : `https://${url}`; //adds http:// because redirect() needs it
            app.get(`/api/shorturl/${hash}`, (req,res,next) => res.redirect(url)) */
                        })
                      .catch( err => res.json({error: err}))
    })
  app.get('/short/:hash', function ( res, req, next) {
                                                      console.log(req["params"]);
                                                      let hash = req.params.hash
                                                      Url.find({hash: hash})
                                                         .exec()
                                                         .then( doc => { 
                                                                          let finalUrl = doc.url;
                                                                          finalUrl = /^https{0,1}:\/\//.test(finalUrl) ? finalUrl : `https://${finalUrl}`;
                                                                          res.redirect(finalUrl)
                                                                }
                                                          )
                                                      })
  
}

//POST method callback

const shortenPostCallback = function( req, res, next){
  
}

const shortenGetCallback = function( req, res, next ){
  
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