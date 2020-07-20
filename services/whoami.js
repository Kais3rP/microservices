const express = require ('express');
const router = express.Router();

  
  //WhoamiI microservice
router.get("/", (req, res, next) => {
  if(!/auth_token/.test(req.headers.cookie)) res.status(401).send({ error: "Log In or Register, to access the service"});
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