var myStorage = window.localStorage;
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
//-----------register login-------------------------//
var registration = document.getElementById("registration");
var login = document.getElementById("login");
var userTitle = document.getElementById("current-user");
var inputUserReg = document.getElementById("input-user-reg");
var inputEmailReg = document.getElementById("input-email-reg");
var inputPwdReg = document.getElementById("input-password-reg");
var regBtn = document.getElementById("register-btn");
var inputUserLog = document.getElementById("input-user-log");
var inputPwdLog = document.getElementById("input-password-log");
var logInBtn = document.getElementById("logIn-btn");
var logOutBtn = document.getElementById("logOut-btn");

//----------------------------create loading animation for uploading service----------------//

let loading = document.createTextNode("Loading...");
let loadingContainer = document.createElement("div");
loadingContainer.appendChild(loading);


//-----------------------------------------------------------------------------
myStorage.setItem("user","Not Logged");
userTitle.innerText = `Current User: ${myStorage.getItem("user")}`
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
//----------------------------------------------------------------------------- register/Login------------
userTitle.innerText = `Current User: ${myStorage.getItem("user")}`;

regBtn.onclick = (e) => { fetchRegister(inputUserReg.value, inputEmailReg.value, inputPwdReg.value); inputUserReg.value = ""; inputEmailReg.value =""; inputPwdReg.value = "";};
logInBtn.onclick = (e) => { fetchLogin(inputUserLog.value, inputPwdLog.value); inputUserLog.value = ""; inputPwdLog.value = "";};
logOutBtn.onclick = (e) => { fetchLogOut() }

//-----------------------------------------------register/login-------------------
const fetchRegister = function (user, email, pwd){
  
  fetch('/api/reglog/register', {
                          method: 'POST',
                          cache: 'no-cache', 
                          headers: {
                          'Content-Type': 'application/json'
                          },
                          referrerPolicy: 'no-referrer',
                          body: JSON.stringify({user: user, email: email, password: pwd})
                          })
       .then( res => res.json())
       .then( data => { console.log(data);alert( data.data )})
       .catch( err => alert(err))
  
  
}

const fetchLogin = function (user, pwd){
  
  fetch('/api/reglog/login', {
                          method: 'POST',
                          cache: 'no-cache', 
                          headers: {
                          'Content-Type': 'application/json'
                          },
                          referrerPolicy: 'no-referrer',
                          body: JSON.stringify({user: user, password: pwd})
                          })
       
       .then( res => { if(res.ok) return res.json(); 
                        alert("Invalid Credentials")})
       .then( data => { if (!data.error) {myStorage.setItem("user", data.user); userTitle.innerText = `Current User: ${myStorage.getItem("user")}`;}})
       .catch( err => console.log(err))
  
}


const fetchLogOut = function (){
  
  fetch('/api/reglog/logout')
       
       .then( res =>  res.json())
       .then( data => { alert(data.data); myStorage.setItem("user", "Not Logged") })
       .catch( err => console.log(err))
  
}

//-------------------------------------------------------------------------------------------------





const fetchNewURL = function (url){ 
  
  fetch("/api/shorten", {
                              method: 'POST',
                              cache: 'no-cache', 
                              headers: {
                              'Content-Type': 'application/json'
                              },
                              referrerPolicy: 'no-referrer',
                              body: JSON.stringify({url: url}) // body data type must match "Content-Type" header //It has to be stringified otherwise it can't be body parsed
                            }
         ).then( res => res.json())
          .then( data => { resultS.innerHTML = data.error ? `Link error: ${data.error}` : `<a href='/api/shorten/${data.hash}' target="_blank">https://kais3r-ms.glitch.me/api/shorten/${data.hash}</a>`})
}

const fetchIP = function (){
  
  fetch('/api/whoami').then( res => res.json())
                      .then( data => { if (!data.error) resultW.innerText = `Your IP is: ${data.ipaddress} - Your language is: ${data.language.split(",")[0]}`;
                                        else alert(data.error)} )
  
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