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
//set bodyparser to parse body for any request with a body with content type json
var jsonParser = bodyParser.json();
require('./shorten')(app, jsonParser);
//------------------------------------------------------------------//


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









// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
