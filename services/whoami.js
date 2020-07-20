const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

  
  //WhoamiI microservice
router.get("/", (req, res, next) => {
  let decodeToken = jwt.verify(/(?<=auth_key).*/req.headers.cookie.)
  else {
  let headers = req.headers;
  res.json({
            "ipaddress": ipFormat(headers["x-forwarded-for"]),
            "language": headers["accept-language"] ,
            "software": headers["user-agent"]
    })
  }
})

//convert ip network info to readable IP address
const ipFormat = (str) => str.split(",").slice(0,1).join();

module.exports = router;