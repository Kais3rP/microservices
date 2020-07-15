var URL ="";
var submitBtnS = document.getElementById("submit-shorten");
var inputS = document.getElementById("input-shorten");
var resultS = document.getElementById("result-shorten");
var submitBtnW = document.getElementById("submit-whoami");
var inputW = document.getElementById("input-whoami");
var resultW = document.getElementById("result-whoami");
//-----------------------------------------------------------------------------
submitBtnS.addEventListener('click', ()=>{URL = inputS.value; fetchNewURL(URL) });
//-----------------------------------------------------------------------------
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
          .then( data => resultS.innerHTML = data.error ? data.error : `<a href='https://kais3r-ms.glitch.me/api/shorturl/${data.hash}'>https://kais3r-ms.glitch.me/api/shorturl/${data.hash}</a>`)
}

const fetchIP = function ()