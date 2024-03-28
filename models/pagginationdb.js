var mysql = require('mysql');

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"root",
});


connection.connect((err)=>{
    if(err) console.log(err);

    // Creating new database
    // let querry1 ="Create Database Student_Info;";
    // connection.query(querry1,(err)=>{
    //     if(err) console.log(err);
    // })

    //Creating Student table
    // let querry2= "Create TABLE Student_Info.Student_Master(Student_id int auto_increment not null primary key, fname varchar(255), lname varchar(255),gender char, email varchar(255), phone_no varchar(15), dept_name varchar(255), addressline1 varchar(255), addressline2 varchar(255), city varchar(255), state varchar(255) );";
    // connection.query(querry2, (err)=>{
    //     if(err) console.log(err);
    //     console.log("Table created successfully!");
    // })

})




async function selectquerry(number){
    let mp = async()=> new Promise((resolve, reject) => {
        let query = "Select * from Student_Info.Student_Master limit 200 offset ?"
        connection.query(query,number,(err,data)=>{
            if(err) console.log(err);
            else console.log("Data is retrived Successfully");
                resolve(JSON.parse(JSON.stringify(data)));
        })
        
    })
    let c = mp();
    return c;
}


async function count(){
    let mp = async()=> new Promise((resolve, reject) => {
        let querry = "Select count(*) as count from Student_Info.Student_Master ;";
        connection.query(querry,(err,data)=>{
            resolve(JSON.parse(JSON.stringify(data)));
        })
    })
    let c = mp();
    return c;
}

async function orderedlist(number,condition){
    let mp = async()=> new Promise((resolve, reject) => {
        let query = `Select * from Student_Info.Student_Master order by  ${condition}   limit 200 offset ?`;
        connection.query(query,number,(err,data)=>{
            if(err) console.log(err);
            else console.log("Data is retrived Successfully");
                resolve(JSON.parse(JSON.stringify(data)));
        })
        
    })
    let c = mp();
    return c;
}

async function fetchdata(i){
    let gatherdata = await selectquerry(i);
    return gatherdata;
}


async function counts(){
    let total = await count();
    return total;
}


async function lists(number, condition){
    let oblists = await orderedlist(number, condition)
    return oblists;
}

module.exports = {fetchdata, counts, lists}