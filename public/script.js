var URL ="";
var submitBtn = document.getElementById("submit");
var input = document.getElementById("input");
var result = document.getElementById("result");
submitBtn.addEventListener('click', ()=>{console.log("helloworld");URL = input.value; fetchNewURL(URL) });
const fetchNewURL = function (url){ 
  fetch("/api/shorturl/new", {
                              method: 'POST',
                              cache: 'no-cache', 
                              headers: {
                              'Content-Type': 'application/json'
                              },
                              referrerPolicy: 'no-referrer',
                              body: JSON.stringify({url: url}) // body data type must match "Content-Type" header //It has to be stringified otherwise it can't be body parsed
                            }
         ).then( res => res.json())
          .then( data => result.innerHTML = data.error ? data.error : `<a href='https://kais3r-ms.glitch.me/api/shorturl/${data.hash}'>https://kais3r-ms.glitch.me/api/shorturl/${data.hash}</a>`)
}