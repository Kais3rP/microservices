document
const fetchNewURL = function (){
  fetch("/api/shorturl/new", {
                              method: 'POST',
                              cache: 'no-cache', 
                             
                              headers: {
                                'Content-Type': 'application/json'
                                
                              },
                      
                              referrerPolicy: 'no-referrer',
                              body: {url:  } // body data type must match "Content-Type" header
                            })).then(())
}