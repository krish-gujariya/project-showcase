let mysql = require("mysql");
const {promisify} = require("util")
function connection() {
  let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "userlogin",
  });
  const myPromiseQuery = promisify(conn.query).bind(conn);
  conn.connect((err) => {
    if (err) console.log(err);
  });
 return {conn, prom:myPromiseQuery};
}

module.exports = {  connection  };


