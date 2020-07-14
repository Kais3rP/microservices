const express = require("express");
const app = express();
var cors = require('cors');

//this is to let externall access to the server
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

app.get("/api/whoami", (req, res, next) => {
  
  
})
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
   console.log(date)
  }
  return date
}


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
