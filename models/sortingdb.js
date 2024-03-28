const { json } = require('express');
let mysql = require('./studentdb-connection');

let conn = mysql.connection();


async function Result(number,Month,year,order){
    
    let sql =`Select Attendance1.Student_Id as Student_Id, Student_Master.fname as fname, count(Attendance1.PA1) as days ,ROUND((count(Attendance1.PA1)*100/31),2) as Percentage
    FROM Attendance1 LEFT JOIN Student_Master 
    ON
    Attendance1.Student_Id = Student_Master.Student_Id
    WHERE PA1 = 1 and Months = ? and Years = ?
    group by Attendance1.Student_Id   
    order by ${order}
    LIMIT ?,20
    `;

    try {
        let res = await conn.prom(sql,[Month,year,number]);
        let obj = JSON.parse(JSON.stringify(res));
        let prop = Object.getOwnPropertyNames(obj[0]);
        return {record:obj, property:prop, success:true}
    } catch (error) {
        console.log(e);
        let mes =JSON.parse(JSON.stringify(error));
        return {success:false, message:mes}
    }

}


module.exports ={Result}