var mysql = require("mysql2/promise");

async function createconnection() {
    
    let conn = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "userlogin",
    });
    
    return conn;
};

module.exports = {createconnection};