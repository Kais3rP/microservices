const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); //to parse body of POST methods encoded
const mongoose = require('mongoose');
const crypto = require('crypto');
require('./whoami')(app);  
/*This is how you separate modules for every microservice route, 
you export it as a function module on whoami.js, it takes an app 
as parameter, and then by requiring it it automatically imports the
function in the current file and by writing require(somePath)(app)
you are  automatically executing that function which implements the endpoint
route, with the current app variable, which is express()*/
require('./timeStamp')(app);
require('/shortenUrl.js')(app);
//
//set bodyparser to parse body for any request with a body with content type json
var jsonParser = bodyParser.json();
//this is to let external access to the server
app.use(cors({optionSuccessStatus: 200})); 
//----------------------------------------------------
// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
//--------------------------------------------------------

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});




// URL shortner microservice 
app.post("/api/shorturl/new", jsonParser, (req, res, next) => { 
  
  var url = req.body.url;
  url = /^http:\/\//.test(url) ? url : `http://${url}`;
  if (validateURL(url)) {
    var hash = hashCode(url);
    res.json({hash: hash})
    app.get(`/api/shorturl/${hash}`, (req,res,next) => res.redirect(url)) 
  } else
    res.send({error: "URL not valid, must be in the form of http(s)://www.myUrl.myDomain"})
   
  
  
})
//---------------------------------------------------------------
//Create a unique URL hash using crypto builtin Nodejs library
const hashCode = function(str){
  return str.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0).toString().split("").slice(1,4).join("")              
}
//Validate URL format

const validateURL = function (str){
  const urlRegExp = new RegExp(/http:\/\/www\.[A-Z0-9a-z.-]+\.\w+$/);
  return urlRegExp.test(str)
}
//---------------------------------------------------------------
//convert ip network info to readable IP address
const ipFormat = (str) => str.split(",").slice(0,1).join()



// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
