const express = require("express");
const app = express();


//----------------------------------------------------
// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
//--------------------------------------------------------

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/api/timestamp/:date_string?", (req, res, next) => {
  // express helps us take JS objects and send them as JSON
  
                        var date = checkDate(req.params.date_string);
                        
                        console.log(typeof date)
                        if (typeof date === "string") throw new Error(date)
                       
                        return res.json({
                        'unix': date.getTime(),
                        'utc': date.toUTCString()
                      })
                                    
               
});
const checkDate = (input) => {
  let date = "";
  let dateRegExp = new RegExp (/^\d\d\d\d-\d{1,2}-\d{1,2}$/);
  let error = "Wrong Date format, insert number of minutes or date in UTC format"

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
