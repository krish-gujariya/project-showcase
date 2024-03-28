let mysql = require('mysql');
let fs = require('fs');

conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"root",
    database: "Student_Info"
})


conn.connect((err)=>{
    if(err) console.log(err);
})







async function Record(number, Month, Year){
    let mp = async()=> new Promise((resolve, reject) => {
        
        sql =`Select Attendance1.Student_Id, Student_Master.fname, count(Attendance1.PA1) as days ,ROUND((count(Attendance1.PA1)*100/31),2) as Percentage
        FROM Attendance1 LEFT JOIN Student_Master 
        ON
        Attendance1.Student_Id = Student_Master.Student_Id
        WHERE PA1 = 1 and Months = ? and Years = ${Year}
        group by Attendance1.Student_Id 
        LIMIT 200 offset ${number};`;
        conn.query(sql,Month,(err,data)=>{
            if(err) console.log(err);
            resolve(JSON.parse(JSON.stringify(data)));
        })
        
    })
    let c = mp();
    return c;
}


async function RecordQuerry(number,month,Year){
    let result = await Record(number, month,Year)
    return result;
}






async function count(){
    let mp = async()=> new Promise((resolve, reject) => {
        let querry = "Select count(*) as count from Student_Master ;";
        conn.query(querry,(err,data)=>{
            resolve(JSON.parse(JSON.stringify(data)));
        })
    })
    let c = mp();
    return c;
}


async function counts(){
    let total = await count();
    return total;
}




// console.log(fs.statSync(__filename));

module.exports = {RecordQuerry , counts}