module.exports = function (app, parser, mongoose){
  
  // URL shortner microservice 
app.post("/api/shorturl/new", parser, (req, res, next) => { 
  
  var url = req.body.url;
  url = /^http:\/\//.test(url) ? url : `http://${url}`;
  if (validateURL(url)) {
    var hash = hashCode(url);
    res.json({hash: hash})
    app.get(`/api/shorturl/${hash}`, (req,res,next) => res.redirect(url)) 
  } else
    res.send({error: "URL not valid, must be in the form of http(s)://www.myUrl.myDomain"})
   })
}


//Returns an unique hash code by a string
const hashCode = function(str){
  return str.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0).toString().split("").slice(1,4).join("")              
}

//Validates URL format
const validateURL = function (str){
  const urlRegExp = new RegExp(/http:\/\/www\.[A-Z0-9a-z.-]+\.\w+$/);
  return urlRegExp.test(str)
}