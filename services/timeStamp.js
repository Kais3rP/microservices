const express = require ('express');
const router = express.Router();

  router.get("/", (req, res, next) => {
                        
                        var date = new Date();
                        
                        return res.json({
                                          'unix': date.getTime(),
                                          'utc': date.toUTCString()
                                })
                });
  // Timestamp microservice 
router.get("/:date", (req, res, next) => {
                        console.log(req.params)
                        var date = req.params.date ? checkDate(req.params.date) : new Date();
                        if (typeof date === "string") return res.json({"error": date})
                        return res.json({
                                          'unix': date.getTime(),
                                          'utc': date.toUTCString()
                                })
                });



//validation of date
const checkDate = (input) => {
  let date = "";
  let dateRegExp = new RegExp (/^\d\d\d\d-\d{1,2}-\d{1,2}$/);
  let error = "Invalid Date"

  //check if it's in UTC format
 if ( /^\d+$/.test(input) ) { date = new Date ( parseInt(input) ) }
 else if (typeof input === "string") {
   
   if (dateRegExp.test(input)) {
   date = (input.match(dateRegExp)[0].length === input.length) ? new Date ( input ) : error
   
    } else date = error ;
   
  }
  return date
}

module.exports = router;