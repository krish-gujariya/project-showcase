const mysql = require("./studentdb-connection");


const {conn, prom} = mysql.connection();



async function fetchdata(number){
        let query = "Select * from Student_Info.Student_Master limit 200 offset ?"
        try {
            const result =  await prom(query,number);
            const data = JSON.parse(JSON.stringify(result));
            return {success:true, data:data};
            
        } catch (error) {
            console.log(error);
            return{success:false, data:null};
        }
        
}


async function counts(){
        let query = "Select count(*) as count from Student_Master ;";

        try {
            const result =await prom(query);
            const data = JSON.parse(JSON.stringify(result));
            return {success:true, count:data[0].count};
            
        } catch (error) {
            console.log(error);
            return{success:false, count:null}
        }
}


async function lists(number,condition){
        let query = `Select * from Student_Master order by  ?   limit 20 offset ?`;

        try {
            const result=  await prom(query,[condition,number]);
            const data = JSON.parse(JSON.stringify(result));
            return {success:true, data:data};            
        } catch (error) {
            console.log(error);
            return {success:false, data:null}
        }        
    }


module.exports = {fetchdata, counts, lists}