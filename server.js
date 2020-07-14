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
app.get("/api/timestamp/:date_string", (req, res) => {
  // express helps us take JS objects and send them as JSON
                        var date = checkDate(req.params.date_string);
                        
                        console.log(date)
                        if (typeof date === "string") res.json({error: })
                       
                        
                        date
                        return res.json({
                        'unix': date.getTime(),
                        'utc': date.toUTCString()
                      })
                                    
               
});
const checkDate = (input) => {
  let date = "";
  //check if it's in UTC format

 if ((input.match(/\w\w\w,\s\d{1,2}\s\w\w\w\s\d\d\d\d\s\d\d:\d\d:\d\d\s\w\w\w/)[0].length === input.length)
  || typeof input === "number") { 
       date = new Date (input); 
       return date
 } else return "Wrong Date format, insert number of minutes or date in UTC format"

}
// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
