module.exports = function (app){
  
  //WhoamiI microservice
app.get("/api/whoami", (req, res, next) => {
  let headers = req.headers;
  res.json({
            "ipaddress": ipFormat(headers["x-forwarded-for"]),
            "language": headers["accept-language"] ,
            "software": headers["user-agent"]
  })
  
})

//convert ip network info to readable IP address
const ipFormat = (str) => str.split(",").slice(0,1).join()

}