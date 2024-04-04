const dbms = require("../models/sortingdb");
const counts = require("../models/attendancedb");


let mon = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

let asdes = ['asc', 'desc'];


const first = (req,res)=>{


    try {
        resultdata();
        
    } catch (error) {
        console.log(error);
    }

    async function resultdata(){
        const data = await dbms.Result(0,1,2024,'Student_Id asc');
        const count = await counts.counts();

            if(data.success){
                res.render('Student-record',{
                    Property:data.property,
                    Data:data.record,
                    init:1,
                    Count:count.count,
                    month: "December",
                    year:2023,
                    order:'Student_Id asc',
                    prop:"Student_Id",
                    asc:0
                })
            }
            else{
                res.send("record not found");
            }
    }



}

let tempmonth = 1;
let tempyear = 2024;
let temporder = "Student_Id";
let tempid = 0;


const list =(req,res)=>{
    let page  = req.query.pg;
    let x = (page-1)*20;
     let month = req.query.values;
     let year = req.query.Year;
     let order = req.query.order;
     let id = req.query.asc;
     if(month ){
        tempmonth = month;
        tempyear = year;
     }
     else{
        month = tempmonth;
        year = tempyear;
     }
     if(order){
        temporder = order;
        tempid = id;
     }
     else{
        order = temporder;
        id = tempid;
     }
     let order1 = order + " "+ asdes[id];
    //  dbms.Result(x,month,year, order1).then((data)=>{
    //     counts.counts().then((data1)=>{
    //         if(data.success){
    //         let num = data1[0].count;
    //             res.render('Student-record',{
    //                 Property: data.property,
    //                 Data:data.record,
    //                 init:page,
    //                 Count:num,
    //                 month: mon[month-1],
    //                 year: year,
    //                 prop:order,
    //                 asc:id
    //             })               
    //         }
    //         else{
    //             console.log(data.message);
    //         }
    //     }).catch((err)=>{console.log(err);});
    // }).catch((err)=>{console.log(err);});

    try {
        resultdata();
        
    } catch (error) {
        console.log(error);
    }

    async function resultdata(){
        const data = await dbms.Result(x,month,year,order1);
        const count = await counts.counts();

            if(data.success){
                res.render('Student-record',{
                    Property:data.property,
                    Data:data.record,
                    init:page,
                    Count:count.count,
                    month: mon[month-1],
                    year:year,
                    prop:order,
                    asc:id
                })
            }
            else{
                res.send("record not found");
            }
    }

}

module.exports ={first,list}