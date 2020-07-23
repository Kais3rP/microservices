var myStorage = window.localStorage;
var URL ="";
var myFormData;
var loading;
var loadingContainer;
var submitBtnS = document.getElementById("submit-shorten");
var inputS = document.getElementById("input-shorten");
var resultS = document.getElementById("result-shorten");
var submitBtnW = document.getElementById("submit-whoami");
var inputW = document.getElementById("input-whoami");
var resultW = document.getElementById("result-whoami");
var submitBtnU = document.getElementById("submit-upload");
var inputU = document.getElementById("input-upload");
var resultU = document.getElementById("result-upload");

//-----------Exercises---------------------------------------
var exUserBtn = document.getElementById("submit-ex-user");
var exUserInput = document.getElementById("input-ex-user");
var exUserResult = document.getElementById("result-ex-user");
var exAddBtn = document.getElementById("submit-ex-add");
var exAddId = document.getElementById("input-ex-id");
var exAddDesc = document.getElementById("input-ex-desc");
var exAddDur = document.getElementById("input-ex-dur");
var exAddDate = document.getElementById("input-ex-date");
var exAddResult = document.getElementById('result-ex-add');


//-----------register login-------------------------//

var register = document.getElementById("register");
var registration = document.getElementById("registration");
var closeReg = document.getElementById("close");
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

//---------------------------------------------------------------------------------------------//

//----------------------------create loading animation for uploading service----------------//

function renderLoading(){
loading = document.createTextNode("Loading...");
loadingContainer = document.createElement("div");
loadingContainer.appendChild(loading);
}  




//-----------------------------------------------------------------------------


//--------------------------------Event Listeners---------------------------------------------

submitBtnS.addEventListener('click', ()=>{URL = inputS.value; fetchNewURL(URL) });
inputS.addEventListener('keydown', (ev)=>{ if (ev.keyCode === 13) { URL = inputS.value; fetchNewURL(URL)} });
submitBtnW.addEventListener('click', ()=>{fetchIP() });

submitBtnU.addEventListener('click', () =>{ if (myStorage.getItem("user")!== "Not Logged") {
                                            myFormData = new FormData();    //create a file like the resulting of a form-data submitting
                                            myFormData.append('file', inputU.files[0], 'file'); //give it a name so it can be read by multer
                                            fetchUpload(myFormData)} else alert("Log In to access this service")
                                          })
inputU.addEventListener('keydown', (ev)=>{ if (ev.keyCode === 13){
                                            myFormData = new FormData();    
                                            myFormData.append('file', inputU.files[0], 'file');
                                            fetchUpload(myFormData)}});
//---------------------------------Exercises---------------------------------------------------------------

exUserBtn.onclick = (e) => { fetch('/api/exercise/new-user', {
                                                              method: 'POST',
                                                              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                                              body: `username=${exUserInput.value}`
                                                              }).then( res => { 
                                                                               if (res.ok) return res.json()
                                                                                alert("Error") } )
                                                                .then ( data => {  exUserResult.innerText = `User: ${data.username}, id: ${data._id}` })
                           }
                            
exAddBtn.onclick = (e) => {
                             if (!exAddId.value || !exAddDesc || !exAddDur || !exAddDate) alert("Please fill all the fields");
                              else fetch('/api/exercise/add', {
                                                              method: 'POST',
                                                              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                                              body: `id=${exAddId.value}&description=${exAddDesc.value}&duration=${exAddDur.value}&date=${exAddDate.value}`
                                                              }).then( res => { 
                                                                               if (res.ok) return res.json()
                                                                                res.json().then((data)=>alert(data.error)) } )
                                                                .then ( data => { console.log(data); exAddResult.innerText = `User: ${data.username}, Description: ${data.description}, Duration: ${data.duration}, Date: ${data.date}` })
                           
} 
//----------------------------------------------------------------------------- register/Login------------

userTitle.innerText = `Current User: ${myStorage.getItem("user") ? myStorage.getItem("user") : 'Not Logged'}`;

regBtn.onclick = (e) => { if(!inputUserReg.value || !inputEmailReg.value || !inputPwdReg.value) alert("Please fill all the fields"); 
                          else fetchRegister(inputUserReg.value, inputEmailReg.value, inputPwdReg.value); 
                          inputUserReg.value = ""; 
                          inputEmailReg.value =""; 
                          inputPwdReg.value = "";
                        };
logInBtn.onclick = (e) => { if(!inputUserLog.value || !inputPwdLog.value ) alert("Please fill all the fields");
                            else fetchLogin(inputUserLog.value, inputPwdLog.value); 
                            inputUserLog.value = ""; 
                            inputPwdLog.value = "";
                          };
logOutBtn.onclick = (e) => { fetchLogOut() }
register.onclick = (e) => { registration.style.display = "block";} //shows the registration modal
closeReg.onclick = (e) => registration.style.display = "none";
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
       .then( res => res.ok ? res.json() : alert("Something's gone wrong"))
       .then( data => { alert( data.data ); registration.style.display = "none"})
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
       
       .then( res => {  if(res.ok) return res.json(); 
                        alert("Invalid Credentials")})
       .then( data => { if (data.error) alert(data.error);
                       else {myStorage.setItem("user", data.user); userTitle.innerText = `Current User: ${myStorage.getItem("user")}`;}})
       .catch( err => console.log(err))
  
}


const fetchLogOut = function (){
  
  fetch('/api/reglog/logout')
       
       .then( res =>  res.json())
       .then( data => { alert(data.data); myStorage.setItem("user", "Not Logged"); userTitle.innerText = `Current User: ${myStorage.getItem("user")}` })
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
  renderLoading();
  resultU.innerText = "";
  loadingContainer.classList.add("loading");
  resultU.appendChild(loadingContainer);
  fetch('/api/upload', {method: 'POST', 
                        cache: 'no-cache', 
                        //when sending a form-data file you don't have to specifiy the header
                        referrerPolicy: 'no-referrer',
                        body: data }
       ).then( res => res.json())
        .then( data => { if (!data.error) resultU.removeChild(loadingContainer);resultU.innerText = `Size: ${data.size/1000} KB`  })
}