let id = (id) => document.getElementById(id);
let names = (names) => document.getElementsByName(names);
let classes = (classes) => document.getElementsByClassName(classes);


let fname = id("fname"),
lname = id("lname"),
email = id("email"),
phone = id("phoneno"),
username = id("uname");


let errMsg = classes("error"),
  successicon = classes("success-icon"),
  failureicon = classes("failure-icon");


  function checkempty(id, serial, errMsg) {
    if (id.value.trim() === "" || id.value === null) {
      errMsg[serial].innerHTML = "Please fill this field";
      id.style.border = "2px solid red";
  
      successicon[serial].style.opacity = "0";
      failureicon[serial].style.opacity = "1";
  
      return false;
    } else {
      errMsg[serial].innerHTML = "";
      id.style.border = "2px solid green";
  
      successicon[serial].style.opacity = "1";
      failureicon[serial].style.opacity = "0";
  
      return true;
    }
  }  



function checkemail(id, serial, errMsg) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(id.value)) {
      errMsg[serial].innerHTML = "";
      id.style.border = "2px solid green";
      successicon[serial].style.opacity = "1";
      failureicon[serial].style.opacity = "0";
  
      return true;
    } else {
      errMsg[serial].innerHTML = "Please enter valid email";
      id.style.border = "2px solid red";
  
      successicon[serial].style.opacity = "0";
      failureicon[serial].style.opacity = "1";
  
      return false;
    }
  }



function checkphone(id, serial, errMsg) {
    var phone2 = /^\d{10}$/;
    if (id.value.match(phone2)) {
      errMsg[serial].innerHTML = "";
      id.style.border = "2px solid green";
  
      successicon[serial].style.opacity = "1";
      failureicon[serial].style.opacity = "0";
  
      return true;
    } else {
      errMsg[serial].innerHTML = "Please enter valid phone number";
      id.style.border = "2px solid red";
  
      successicon[serial].style.opacity = "0";
      failureicon[serial].style.opacity = "1";
  
      return false;
    }
  }


  function validation(){
      
      let err =[];
  
      err.push(checkempty(fname,0,errMsg));
      err.push(checkempty(lname,1,errMsg));
      
      if (!checkempty(email, 2, errMsg)) {
        err.push(false);
      } else if (!checkemail(email, 2, errMsg)) {
        err.push(false);
      }
      
      
      if (!checkempty(phone, 3, errMsg)) {
        err.push(false);
      } else if (!checkphone(phone, 3, errMsg)) {
        err.push(false);
      }
      
      err.push(checkempty(username,4,errMsg));

    if(err.includes(false)){
      return false;
    }
    else{
      return true;
    }

  }

  let forms = document.getElementById("forms");
  console.log(forms);
  
  forms.addEventListener("click",  async event=>{
  let form = document.getElementById("form");
  event.preventDefault();
  
  if(validation()){
    let datas = new URLSearchParams(new FormData(form));
    
    try {
      let res = await fetch("http://localhost:8000/savedata",{
        method:"POST",
        body:datas,
        headers:{"Content-Type":"application/x-www-form-urlencoded"}  
      })
      let data = await res.json();
      if(data.useractive){
        useractivation(data);
      }
      else if(data.link){
        let element = document.getElementById("activate");
        element.innerHTML = `<p>Your account has been successfully created click below  for activate your account</p><a href = "${data.link}">Here</a>`
      }
      else{
        showusererror(data.field);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
    )


    function showusererror(field){
      if(field.includes("phone")){
        errMsg[3].innerHTML ="Phone no. already exist!";
      }
      else{
        errMsg[3].innerHTML ="";
        
      }

      if(field.includes("email")){
        errMsg[2].innerHTML ="Email already exist!";
      }
      else{
        errMsg[2].innerHTML ="";

      }
      if(field.includes("uname")){
        errMsg[4].innerHTML ="Username already exist!"
      }
      else{
        errMsg[4].innerHTML =""

      }

    }


function useractivation(data){
  let element = document.getElementById("activate");
  element.innerHTML = `<p>User is exist but account is not activated </p><a href = "${data.link}">Here</a>`



}