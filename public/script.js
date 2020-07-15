var URL ="";
var submitBtnS = document.getElementById("submit-shorten");
var inputS = document.getElementById("input-shorten");
var resultS = document.getElementById("result-shorten");
var submitBtnW = document.getElementById("submit-whoami");
var inputW = document.getElementById("input-whoami");
var resultW = document.getElementById("result-whoami");
//-----------------------------------------------------------------------------
submitBtnS.addEventListener('click', ()=>{URL = inputS.value; fetchNewURL(URL) });
submitBtnW.addEventListener('click', ()=>{fetchIP() });
//-----------------------------------------------------------------------------
const fetchNewURL = function (url){ 
  fetch("/name", {
                              method: 'POST',
                              cache: 'no-cache', 
                              headers: {
                              'Content-Type': 'application/json'
                              },
                              referrerPolicy: 'no-referrer',
                              body: JSON.stringify({url: url}) // body data type must match "Content-Type" header //It has to be stringified otherwise it can't be body parsed
                            }
         ).then( res => {console.log(res);res.json()})
          .then( data => { console.log(data); resultS.innerHTML = data.error ? data.error : `<a href='/api/shorturl/${data.hash}'>https://kais3r-ms.glitch.me/api/shorturl/${data.hash}</a>`})
}

const fetchIP = function (){
  
  fetch('/api/whoami').then( res => res.json())
                      .then( data => { console.log(data);resultW.innerText = `Your IP is: ${data.ipaddress} - Your language is: ${data.language.split(",")[0]}`} )
  
}

