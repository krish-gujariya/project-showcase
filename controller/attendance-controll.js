const dbms = require("../models/attendancedb");

let mon = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];


const first  = (req,res)=>{
    let x =1;
    let pg =0;
    let month = 12;
    let months = mon[month-1]
    let year = 2023;
    dbms.RecordQuerry(pg,month,year).then((data)=>{
        dbms.counts().then((data2)=>{
            let count1 = data2[0].count;
            res.render('attendance',{Data:data, Count:count1, init:x, value:month, year:year, month:months});
        }).catch(err=>{console.log(err);})

    }).catch(err=>{console.log(err);})
    
    };

const list = (req,res)=>{
    let x = (req.query.page-1)*200;
    let page =req.query.page;
    let year =req.query.Year;
    let month = req.query.values;
    let months = mon[month-1]
    dbms.RecordQuerry(x, month, year).then((data)=>{
        dbms.counts().then((data2)=>{
            let count1 = data2[0].count;
            res.render('attendance',{Data:data, Count:count1, init:page , value:month ,year:year, month:months});
        }).catch(err=>{console.log(err);})
    }).catch(err=>{console.log(err);})
    

    }

    module.exports = {first, list}