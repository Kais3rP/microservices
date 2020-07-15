const express = require("express");
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser'); //to parse body of POST methods encoded
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
  // express helps us take JS objects and send them as JSON
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
  console.log(url)
  app.get("/0", (req,res,next) => res.redirect(url))
  
  
})

//Validate the URL

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
