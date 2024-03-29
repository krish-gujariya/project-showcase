let start = 0;
let end = 10;
let resultdata;
async function getjsondata(){
    let result = await fetch("https://jsonplaceholder.typicode.com/posts");
      resultdata = await result.json();
    tablerecords(start,end);
    return resultdata;
}

getjsondata();


 function nextdata(){
     start =start+10;
     end =end+10;
     if(start<91){
         tablerecords(start,end);
     }
     else{
        start = 90, end =100;
     }
   
}

function previousdata(){
    start =start-10;
    end =end-10;
    if(start >=0){
        tablerecords(start,end);
    }
    else{
        start = 0 ,  end =10;
    }
     
}


function homedata(){
    start = 0, end = 10;
    tablerecords(start,end);
}

function enddata(){
    start = 90, end =100;
    tablerecords(start,end);
}

async function tablerecords(start,end){
    let html = "";
let table  =document.getElementById("jsonrecord");
    table.innerHTML =``;
    for (let index = start; index < end; index++) {
                         
         html = html + 
    `<tr id ="id${resultdata[index].id}">
        <td>${resultdata[index].id}</td>
        <td>${resultdata[index].title}</td>
        <td>${resultdata[index].body}</td>
        <td><button onclick="commentrecords(${resultdata[index].id})" >Show Comment</button></td>
        
    </tr>`;
}

table.innerHTML = table.innerHTML + html;

}


async function getcomment(){
    let comment  = await fetch("https://jsonplaceholder.typicode.com/comments");
    let commnetrecord = await comment.json();
    return commnetrecord;
}

async function commentrecords(index){
    let tr = document.querySelector(`#id${index}`);
    let bt = document.querySelector(`#id${index} button`);
    bt.innerHTML ="Hide Comments";
    bt.setAttribute('onclick',`removecomment(${index})`);
    let data = await getcomment();
    
    let html =""
    data.forEach(element => {
        if(element.postId == index){
            html  = html +`<div class="row">
            <p>Id:- ${element.id}</p>
            <p>Name:- ${element.name}</p>
            <p>Email:- ${element.email}</p>
            <p>Body:- ${element.body}</p>
            </div>`;
        }
    });
    let html1 = ` <tr id ="comment${index}">
    <td colspan="4">
    <div class="box">
    ${html}
    </div>
    </td>
    </tr>`;
    tr.insertAdjacentHTML('afterend',html1);
}


function removecomment(index){
    let bt = document.querySelector(`#id${index} button`);
    bt.innerHTML ="Show Comments";
    bt.setAttribute('onclick',`commentrecords(${index})`);
    
    let tr = document.getElementById(`comment${index}`)
    tr.remove();
}


async function searchdata(){
    console.log("MLKMLMLK");
    let trow = document.getElementById("jsonrecord");
    let btn = document.querySelectorAll(".col button");
    let backbtn = document.querySelector("#goback");
    console.log(backbtn);
    backbtn.style.visibility = "visible"

    btn.forEach(element => {
        element.style.visibility = "hidden"
    });

    trow.innerHTML = "";
    let html = "";
    let inp  = document.getElementsByClassName("search");
    let string = inp[0].value;
    let data = await getjsondata();
    if(!(string.trim() ==""|| string == null)){

        data.forEach(element => {
            if(element.title.startsWith(string.toLowerCase())){
                html = html + `        <tr id ="id${element.id}">
                <td>${element.id}</td>
                <td>${element.title}</td>
                <td>${element.body}</td>
                <td><button onclick="commentrecords(${element.id})" >Show Comment</button></td>
                
                </tr>`;
            }
        });
    }
    

    if(!(html == "")){
        trow.innerHTML = html;

    }

    else{
        trow.innerHTML = `<td colspan= 4 class = "notfound">
        No Record Found
        </td>`
    }
}

function goback(){
    let btn = document.querySelectorAll(".col button");
    let backbtn = document.querySelector("#goback");
    backbtn.style.visibility = "hidden"


    btn.forEach(element => {
        element.style.visibility = "visible"
    });
    let inp  = document.getElementsByClassName("search");
    inp[0].value = "";

    tablerecords(0,10)
    

}