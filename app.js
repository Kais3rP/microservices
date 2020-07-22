const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); //to parse body of POST methods encoded
const mongoose = require('mongoose');
const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({extended: false});

//------------------------------------------------------------//

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//------------------------------------------------------------//


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

//-------------------------------------------------------------//




//--- Use express.Router to define specific modules routes for every microservice
const whoAmI = require('./services/whoami');
const uploadFile = require('./services/uploadFile');
const timeStamp = require('./services/timeStamp');
const shortenUrl = require('./services/shorten/shorten');
const regLog = require('./services/reglog/regLog');
const exercises = require('./services/exercises/exercises.js');

app.use('/api/whoami', whoAmI );
app.use('/api/upload', uploadFile);
app.use('/api/timestamp/:date_string', timeStamp);
app.use('/api/shorten', shortenUrl);
app.use('/api/reglog', regLog);
app.use('/api/exercise', exercises );



module.exports = app;