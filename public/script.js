var userName = "Not Logged In";
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
var user = document.getElementById("current-user");

//----------------------------create loading animation for uploading service----------------//
let loading = document.createTextNode("Loading...");
let loadingContainer = document.createElement("div");
loadingContainer.appendChild(loading);


//-----------------------------------------------------------------------------
submitBtnS.addEventListener('click', ()=>{URL = inputS.value; fetchNewURL(URL) });
inputS.addEventListener('keydown', (ev)=>{ if (ev.keyCode === 13) { URL = inputS.value; fetchNewURL(URL)} });
submitBtnW.addEventListener('click', ()=>{fetchIP() });

submitBtnU.addEventListener('click', () =>{ myFormData = new FormData();    //create a file like the resulting of a form-data submitting
                                            myFormData.append('file', inputU.files[0], 'file'); //give it a name so it can be read by multer
                                          
                                            fetchUpload(myFormData)} )
inputU.addEventListener('keydown', (ev)=>{ if (ev.keyCode === 13){
                                            myFormData = new FormData();    
                                            myFormData.append('file', inputU.files[0], 'file');
                                            fetchUpload(myFormData)}});
//-----------------------------------------------------------------------------
user.innerText = `Current User: ${userName}`;






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
          .then( data => { resultS.innerHTML = data.error ? `Link error: ${data.error.errno}` : `<a href='/short/${data.hash}' target="_blank">https://kais3r-ms.glitch.me/short/${data.hash}</a>`})
}

const fetchIP = function (){
  
  fetch('/api/whoami').then( res => res.json())
                      .then( data => { resultW.innerText = `Your IP is: ${data.ipaddress} - Your language is: ${data.language.split(",")[0]}`} )
  
}

const fetchUpload = function(data){
  resultU.innerText = "";
  loadingContainer.classList.add("loading");
  resultU.appendChild(loadingContainer);
  fetch('/api/upload', {method: 'POST', 
                        cache: 'no-cache', 
                        //when sending a form-data file you don't have to specifiy the header
                        referrerPolicy: 'no-referrer',
                        body: data }
       ).then( res => res.json())
        .then( data => { resultU.removeChild(loadingContainer);resultU.innerText = `Size: ${data.size/1000} KB`  })
}