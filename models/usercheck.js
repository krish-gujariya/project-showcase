const { createConnection } = require("mysql2");
let database = require("./DbConnection");

async function availablefield(user,email,phone){
    let fieldlist = [];
    const conn = await database.createconnection();
    let sql1 = `Select username from users where username =?  ; `;
    let uname = await conn.query(sql1,user);

    if(uname[0].length){

        fieldlist.push("uname");
    }

    let sql2 = `Select email from users where email =?  ;`;
    let uemail = await conn.query(sql2,email);

    if(uemail[0].length){
        fieldlist.push("email");
    }

    let sql3 = `Select phone from users where phone = ?  ;`;
    let uphone = await conn.query(sql3,phone);
    if(uphone[0].length){
        fieldlist.push("phone");
    }

    return fieldlist;
}



async function activeuser(user){
    let sql = `Select username, hashpassword, id from users where username =?  ; `
    const conn = await database.createconnection();
    let data = await conn.query(sql,user);
    if(data[0].length){
        if(!data[0][0].hashpassword){
            return {success:true, id:data[0][0].id};
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
        const conn = await database.createconnection();
        let data = await conn.query(sql,[username]);
        if(data[0].length){
            if(data[0][0].hashpassword){
                
                return {success:true, credential:data[0][0]}
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