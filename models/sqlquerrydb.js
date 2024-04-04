let mysql = require("./studentdb-connection");

let {conn , prom} = mysql.connection();


async function RecordQuerry(sql, number) {
  if (!sql.match(/select/i)) {
    console.log("Only Select Querry will allowed");
    return 0;
  }
  let sq;
  if (sql.match(/limit/i)) {
    sq = ` select * from (${sql}) as ds LIMIT ?,20`;
  } else {
    sq = `${sql} LIMIT ?,20 `;
  }

  try {
    const result = await prom(sq,[number]);
    const data = JSON.parse(JSON.stringify(result));
    const property = Object.getOwnPropertyNames(data[0])
    return{ success:true, data:data, prop:property}
    
  } catch (error) {
    return{success:false, data:null}
  }

}



async function counts(sql){
    let sq = `Select count(*) as count from (${sql}) as sd`;
    try {
      const result = await prom(sq);
      const count = JSON.parse(JSON.stringify(result));
      return{ success:true, count:count[0].count}
      
    } catch (error) {
      let errormessage = JSON.parse(JSON.stringify(error)).sqlMessage;
      return{success:false, count:errormessage}
    }
  // const abc = ()=> {
  //     return new Promise((resolve,reject)=>{
  //         conn.conn.query(sq, (err,data)=>{
  //             if(err){reject(err)}
  //             else {
  //                 resolve(JSON.parse(JSON.stringify(data)));
  //             }
  //         })
  //     });
  // };
 
  // try {
  //     let w = await abc();
  //     return { success:true, data:w}
  // } catch (error) {
  //     let errormessage = JSON.parse(JSON.stringify(error)).sqlMessage;
  //     return{ success:false, data:errormessage}
  // }
}
module.exports = { RecordQuerry, counts };


