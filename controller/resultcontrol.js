const dbms = require("../models/resultdb");
const count1 = require("../models/pagginationdb");


const first = (req, res) => {
    let x = 1;
    let pg = 0;
    dbms.RecordQuerry(pg).then((data) => {
      count1.counts().then((data2) => {
        let count1 = data2[0].count;
        res.render("Result", {
          Data: data,
          Count: count1,
          init: x,
        });
      });
    });
  }


const list = (req, res) => {
    let x = (req.query.page - 1) * 200;
    console.log(x);
    let page = req.query.page;
    dbms.RecordQuerry(x).then((data) => {
      count1.counts().then((data2) => {
        let count1 = data2[0].count;
        res.render("Result", {
          Data: data,
          Count: count1,
          init: page,
        });
      });
    });
  }

const result = (req,res)=>{
    let val = req.query.value;
    dbms.grade(val).then((data2)=>{
        dbms.Attenper(val).then((data3)=>{

            dbms.Resultdata(val).then((data)=>{
                res.render("Marksheet" ,{
                    Data:data,
                    Info:data2[0],
                    roll:val,
                    perc:data3[0]
                })
            })
        })
    })
}

  module.exports ={
    first,
    list,
    result
  }