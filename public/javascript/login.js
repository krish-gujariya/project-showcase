let id = (id) => document.getElementById(id);
let names = (names) => document.getElementsByName(names);
let classes = (classes) => document.getElementsByClassName(classes);

let uname = id("uname"),
  passwod = id("password");

let errMsg = classes("error"),
  successicon = classes("success-icon"),
  failureicon = classes("failure-icon");

let button = document.getElementById("submit-btn");

const form = document.getElementById("form");

button.addEventListener("click", async (event) => {
  if (loginvalidate()) {
    let datas = new URLSearchParams(new FormData(form));
    console.log(Array.from(datas));
    try {
        let res = await fetch("http://localhost:8000/verify",{
            method:"POST",
            body:datas,
            headers:{"Content-Type":"application/x-www-form-urlencoded"}  
          })
          let data = await res.json();
          if(data.success){
            window.location ="/dashboard"
            const submitmessage = document.getElementById("submit");
            submitmessage.innerHTML ="You have successfully logged in";
          }
          else{
            errMsg[1].innerHTML = "Invalid Credentials!"
          }
    } catch (error) {
        console.log("Error",error);
    }
  }
});

function loginvalidate() {
  let err = [];

  err.push(checkempty(uname, 0, errMsg));
  err.push(checkempty(passwod, 1, errMsg));

  if (err.includes(false)) {
    return false;
  } else {
    return true;
  }
}

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
