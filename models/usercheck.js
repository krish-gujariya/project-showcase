const { createConnection } = require("mysql2");
let database = require("./studentdb-connection");

const {conn, prom }  = database.connection();


async function availablefield(user,email,phone){
    let fieldlist = [];
    let sql1 = `Select username from users where username =?  ; `;
    let result = await prom(sql1,user);
    let uname = JSON.parse(JSON.stringify(result));
    console.log(uname);
    if(uname.length){

        fieldlist.push("uname");
    }

    let sql2 = `Select email from users where email =?  ;`;
    const result2 = await prom(sql2,email);
    let uemail = JSON.parse(JSON.stringify(result2));
    console.log("uemail",uemail);

    if(uemail.length){
        fieldlist.push("email");
    }

    let sql3 = `Select phone from users where phone = ?  ;`;
    const result3 = await prom(sql3,phone);
    let uphone  = JSON.parse(JSON.stringify(result3));
    if(uphone.length){
        fieldlist.push("phone");
    }

    return fieldlist;
}



async function activeuser(user){
    let sql = `Select username, hashpassword, id from users where username =?  ; `
    const result = await prom(sql,user);
    let data = JSON.parse(JSON.stringify(result));
    console.log(data);
    if(data.length){
        if(!data[0].hashpassword){
            return {success:true, id:data[0].id};
        }
        else{
            return {success:false};
        }
    }
    else{
        return{success:false}
    }

}



async function finduser(username){

    const sql = `Select username ,salt, hashpassword from users where username = ?;`
    try {
        const result = await prom(sql,[username]);
        let data = JSON.parse(JSON.stringify(result));
        if(data.length){
            if(data[0].hashpassword){
                
                return {success:true, credential:data[0]}
            }
            else{
                return{success:false}

            }
        }
        else{
            return{success:false}
        }
        
    } catch (error) {
        console.log(error);
        return {success:false}
    }

}



module.exports = {availablefield , activeuser, finduser}