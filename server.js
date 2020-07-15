const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); //to parse body of POST methods encoded
const mongoose = require('mongoose');

const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({extended: false});

//------------------------------------------------------------//

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//-------------------------------------------------------------//

require('./whoami')(app);  
/*This is how you separate modules for every microservice route, 
you export it as a function module on whoami.js, it takes an app 
as parameter, and then by requiring it it automatically imports the
function in the current file and by writing require(somePath)(app)
you are  automatically executing that function which implements the endpoint
route, with the current app variable, which is express()*/
require('./timeStamp')(app);
//set bodyparser to parse body for any request with a body with content type json

require('./shorten')(app, jsonParser, mongoose);
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






// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
