const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); //to parse body of POST methods encoded
const mongoose = require('mongoose');
const crypto = require('crypto');

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

// Timestamp microservice endpoint
app.get("/api/timestamp/:date_string?", (req, res, next) => {

                        var date = req.params.date_string ? checkDate(req.params.date_string) : new Date();
                        if (typeof date === "string") return res.json({"error": date})
                        return res.json({
                                          'unix': date.getTime(),
                                          'utc': date.toUTCString()
                                })
                });
//route that gives you info on the visitor
app.get("/api/whoami", (req, res, next) => {
  console.log(req.headers)
  console.log(req.headers["x-forwarded-for"])
  let headers = req.headers;
  res.json({
            "ipaddress": ipFormat(headers["x-forwarded-for"]),
            "language": headers["accept-language"] ,
            "software": headers["user-agent"]
  })
  
})

//Make an URL shortner microservice 
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

//validation of date
const checkDate = (input) => {
  let date = "";
  let dateRegExp = new RegExp (/^\d\d\d\d-\d{1,2}-\d{1,2}$/);
  let error = "Invalid Date"

  //check if it's in UTC format
 if ( /^\d+$/.test(input) ) { date = new Date ( parseInt(input) ) }
 else if (typeof input === "string") {
   
   if (dateRegExp.test(input)) {
   date = (input.match(dateRegExp)[0].length === input.length) ? new Date ( input ) : error
   
    } else date = error ;
   
  }
  return date
}


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
