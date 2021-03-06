const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

  
  //WhoamiI microservice
router.get("/", (req, res, next) => {
   //verifies the legitimity of token sent by request
  if (!req.headers.cookie) return res.status(401).send({ error: "Log In or Register, to access the service"});
  let decodedToken = jwt.verify(/(?<=auth_token=).*/.exec(req.headers.cookie)[0], process.env.SECRET);
  if (!decodedToken) return res.status(401).send({ error: "Log In or Register, to access the service"});
  
  let headers = req.headers;
  res.json({
            "ipaddress": ipFormat(headers["x-forwarded-for"]),
            "language": headers["accept-language"] ,
            "software": headers["user-agent"]
    })
  
})

//convert ip network info to readable IP address
const ipFormat = (str) => str.split(",").slice(0,1).join();

module.exports = router;