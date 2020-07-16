var URL ="";
var myFormData;
var submitBtnS = document.getElementById("submit-shorten");
var inputS = document.getElementById("input-shorten");
var resultS = document.getElementById("result-shorten");
var submitBtnW = document.getElementById("submit-whoami");
var inputW = document.getElementById("input-whoami");
var resultW = document.getElementById("result-whoami");
var submitBtnU = document.getElementById("submit-upload");
var inputU = document.getElementById("input-upload");
var resultU = document.getElementById("result-upload");

//----------------------------create loading animation for uploading service----------------//
let loading = document.createTextNode("Loading...")

//-----------------------------------------------------------------------------
submitBtnS.addEventListener('click', ()=>{URL = inputS.value; fetchNewURL(URL) });
submitBtnW.addEventListener('click', ()=>{fetchIP() });
submitBtnU.addEventListener('click', () =>{ myFormData = new FormData();    //create a file like the resulting of a form-data submitting
                                            myFormData.append('file', inputU.files[0], 'file'); //give it a name so it can be read by multer
                                          
                                            fetchUpload(myFormData)} )
//-----------------------------------------------------------------------------


const fetchNewURL = function (url){ 
  
  fetch("/api/shorturl", {
                              method: 'POST',
                              cache: 'no-cache', 
                              headers: {
                              'Content-Type': 'application/json'
                              },
                              referrerPolicy: 'no-referrer',
                              body: JSON.stringify({url: url}) // body data type must match "Content-Type" header //It has to be stringified otherwise it can't be body parsed
                            }
         ).then( res => res.json())
          .then( data => { resultS.innerHTML = data.error ? `Link error: ${data.error.errno}` : `<a href='/short/${data.hash}'>https://kais3r-ms.glitch.me/short/${data.hash}</a>`})
}

const fetchIP = function (){
  
  fetch('/api/whoami').then( res => res.json())
                      .then( data => { resultW.innerText = `Your IP is: ${data.ipaddress} - Your language is: ${data.language.split(",")[0]}`} )
  
}

const fetchUpload = function(data){
  resultU.innerText = "";
  resultU.appendChild(loading);
  resultU.classList.add("loading");
  fetch('/api/upload', {method: 'POST', 
                        cache: 'no-cache', 
                        //when sending a form-data file you don't have to specifiy the header
                        referrerPolicy: 'no-referrer',
                        body: data }
       ).then( res => res.json())
        .then( data => { resultU.removeChild(loading);resultU.classList.remove("loading");resultU.innerText = `Size: ${data.size/1000} KB`  })
}