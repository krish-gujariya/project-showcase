const { json } = require("express");
const mysql = require("./studentdb-connection");

const { conn, prom } = mysql.connection();

async function fetchdata(number) {
  let sql = "Select * from Student_Master limit ?,20;";

  try {
    let result = await prom(sql, number);
    let obj = JSON.parse(JSON.stringify(result));
    let prop = Object.getOwnPropertyNames(obj[0]);
    return { record: obj, property: prop, success: true };
  } catch (error) {
    let mess = JSON.parse(JSON.stringify(error)).sqlMessage;
    return { success: false, message: mess };
  }
}

async function search(condition,num) {
  let sql = `Select * from  Student_Master ${condition} limit ${num},20 `;
  let sql1 = `Select * from  Student_Master ${condition}`;
let sql2 =   `Select count(*) as count from (${sql1}) as details`;
  try {
    let res = await prom(sql);
    let res2 = await prom(sql2);
    let obj = JSON.parse(JSON.stringify(res));
    let obj2 = JSON.parse(JSON.stringify(res2));
    let count = obj2[0].count;
    let prop = Object.getOwnPropertyNames(obj[0]);
    return { record: obj, property: prop, success: true,  count:count};
  } catch (error) {
    console.log(error);
    let mess = JSON.parse(JSON.stringify(error)).sqlMessage;
    return { success: false, message: mess };
  }
}


module.exports = { fetchdata , search };

