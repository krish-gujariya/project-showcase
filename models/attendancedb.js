let mysql = require("./studentdb-connection");

let {conn,prom} = mysql.connection();





async function Record(number, Month, Year){
        
        sql =`Select Attendance1.Student_Id, Student_Master.fname, count(Attendance1.PA1) as days ,ROUND((count(Attendance1.PA1)*100/31),2) as Percentage
        FROM Attendance1 LEFT JOIN Student_Master 
        ON
        Attendance1.Student_Id = Student_Master.Student_Id
        WHERE PA1 = 1 and Months = ? and Years = ?
        group by Attendance1.Student_Id 
        LIMIT 200 offset ${number};`;
        try {
            const result = await  prom(sql,[Month,Year]);
            const data = JSON.parse(JSON.stringify(result));
            return {data:data, success:true};
            
        } catch (error) {
            console.log(error);
            return{success:false, data:null}
        }
    
        
}







async function counts(){
        let querry = "Select count(*) as count from Student_Master ;";
        try {
            const result = await prom(querry);
            const counts = JSON.parse(JSON.stringify(result));
            return {success:true,count:counts[0].count}
        } catch (error) {
                    console.log(error);
                    return {success:false}            
        }
}





module.exports = {Record , counts}