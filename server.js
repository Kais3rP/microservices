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
app.get("/api/timestamp/:date_string?", (req, res) => {
  // express helps us take JS objects and send them as JSON
  response.json((req,res)=>{ if (!req.parameters.date_string) {
                                let date = new Date();}  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
