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




//--- Use express.Router to define specific modules routs for every microservice
const whoAmI = require('./services/whoami');
const uploadFile = require('./services/uploadFile');
const timeStamp = require('./services/timeStamp')
const shortenUrl = require('./services/shorten/shorten')

app.use('/api/whoami', whoAmI );
app.use('/api/upload', uploadFile);
app.use('/api/timestamp/:date_string', timeStamp);
app.use('/api/shorten', shortenUrl);




//-------------------
//require('./services/timeStamp')(app);
//require('./services/shorten')(app, jsonParser, mongoose);
//require('./services/whoami')(app); 
//require('./services/uploadFile')(app);
require('./services/cartList')(app);
require('./services/reg-log')(app, jsonParser, mongoose);

module.exports = app;