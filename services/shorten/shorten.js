const express = require ('express');
const router = express.Router();
const Url = require('./Url')
 
const util = require('util'); //this is useful to promisify
const dns = require('dns');  //needed to use dns.lookup



const lookupAsync = util.promisify(dns.lookup) //promisifies dns.lookup method
  

  
  //------Routes-------------------------------------

    router.post("/", postCallback )
    router.get('/:hash', getCallback )
  
//-----------------------------------------------

//POST route callback

async function postCallback ( req, res, next){
  
      
      var urlStandard = req.body.url;
      let hash = hashCode(urlStandard);
      urlStandard = /^https{0,1}:\/\//.test(urlStandard) ? urlStandard.replace(/^https{0,1}:\/\//,"") : urlStandard; //gets rid of http:// because dns.lookup doesn't support it

      //Looks if it's a valid url
  try {
   const isValidUrl =  await lookupAsync(urlStandard)
        console.log(isValidUrl)
        let url = new Url({url: urlStandard, hash: hash});
    
    try{
          const isAlreadyExistant = await  Url.findOne({url: urlStandard}).exec()  //this promise doesn't reject, if it doesn't find a match it gives back null
             console.log(isAlreadyExistant)
          //If it resolves already existant it gives back the hash ans doesn't save a new entry of the url in the
            if(isAlreadyExistant) res.json({hash: hash})
            else {
              url.save()
                        .catch(err => {throw new Error(err)})  //this saves the document created in the DB and returns a promise
              res.json({hash: hash})
            }
            
      
          
          } catch {
            console.log("nonexistant")
          }
        
                         } catch {  console.log("url not valid")
                                    next() }
}
//GET route callback
  async function getCallback ( req, res, next ){
  
   let hash = req.params.hash
                                          try{
                                          const doc = await  Url.findOne({hash: hash}).exec()

                                          let finalUrl = doc.url;
                                          finalUrl = /^https{0,1}:\/\//.test(finalUrl) ? finalUrl : `http://${finalUrl}`;
                                          res.redirect(finalUrl)

                                           } catch {
                                             next();
                                           }  
  }
                                           
                                                          
    

//Returns an unique hash code by a string
function hashCode (str){
  return str
            .split("")
    .reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)
    .toString()
    .split("")
    .slice(1,4)
    .join("")              
}

//Validates URL format
 function validateURL (str){
  const urlRegExp = new RegExp(/www\.[A-Z0-9a-z.-]+\.\w+$/);
  return urlRegExp.test(str)
}

module.exports = router;