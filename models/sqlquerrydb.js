let mysql = require("./studentdb-connection");

let conn = mysql.connection();

// async function Record(sql, number) {
//   let mp = async () =>
//     new Promise((resolve, reject) => {
//       let sq = `${sql} LIMIT ?,200 `;
//       conn.query(sq, number, (err, data) => {
//         if (err) console.log(err);
//         else {
//           console.log("Data is retrived Successfully");
//           resolve(JSON.parse(JSON.stringify(data)));
//         }
//       });
//     });

//   let c = await mp();
//   return c;
// }


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

  const myQuery = () => {
    return new Promise((resolve, reject) => {
      conn.conn.query(sq, number, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(JSON.stringify(data)));
        }
      });
    });
  };

  try {
    const myQueryExecute = await myQuery();
    // const data = await mysql.myPromiseQuery("")
    const props = Object.keys(myQueryExecute[0]);
    return {success: true, status: 200, data: {students: myQueryExecute, props}}
  } catch (err) {
    let w = JSON.parse(JSON.stringify(err)).sqlMessage;
    return {success: false, status: 400, data: w};
  }
}

// RecordQuerry("Select* from  Result, Student_Master ",1);


// RecordQuerry('Select * from Resut',1).then((data)=>{
//     console.log(data);
// })


// const runSQLQuery = (query, values) => {
//   return new Promise((resolve, reject) => {
//     try {
//       conn.query(query, values, (err, data) => {
//         if (err) console.log(err);
//         else {
//           resolve(data);
//         }
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };


// counts('Select * from Student_Master,Result').then((data)=>{
//   if(data.success){
//     console.log("NJKnjkn");
//   }

//   else{
//     console.log(typeof data.data);
//   }
// })

async function counts(sql){
    let sq = `Select count(*) as count from (${sql}) as sd`
  const abc = ()=> {
      return new Promise((resolve,reject)=>{
          conn.conn.query(sq, (err,data)=>{
              if(err){reject(err)}
              else {
                  resolve(JSON.parse(JSON.stringify(data)));
              }
          })
      });
  };
 
  try {
      let w = await abc();
      return { success:true, data:w}
  } catch (error) {
      let errormessage = JSON.parse(JSON.stringify(error)).sqlMessage;
      return{ success:false, data:errormessage}
  }
}
module.exports = { RecordQuerry, counts };



// const res = await (async () => new Promise((resolve, reject) => {
//     try{
//         conn.query(sq,number,(err,data)=>{
//             if(err){
//                 let c =JSON.parse(JSON.stringify(err)).sqlMessage ;
//                 console.log(c);

//             }
//             else{
//                 resolve(JSON.parse(JSON.stringify(data)));
//             }
//         })
//     }catch(e){

//         reject(e);
//     }
// }))()

// const response = await runSQLQuerry;
// console.log(res);
