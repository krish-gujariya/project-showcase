const dbms = require("../models/attendancedb");

let mon = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const first = (req, res) => {
  let x = 1;
  let pg = 0;
  let month = 12;
  let months = mon[month - 1];
  let year = 2023;

  try {
      showrecords();
    
  } catch (error) {
    console.log(error);
  }

async function showrecords (){
    const data = await dbms.Record(pg,month,year);
    if(data.success){
        const count = await dbms.counts();

                res.render("attendance", {
                  Data: data.data,
                  Count: count.count,
                  init: x,
                  value: month,
                  year: year,
                  month: months,
                });
    }
    else{
        res.send("record not found")
    }

}


};

const list = (req, res) => {
  let x = (req.query.page - 1) * 200;
  let page = req.query.page;
  let year = req.query.Year;
  let month = req.query.values;
  let months = mon[month - 1];

try {
    showrecords();
  
} catch (error) {
  console.log(error);
}

async function showrecords (){
  const data = await dbms.Record(x,month,year);
  if(data.success){
      const count = await dbms.counts();

              res.render("attendance", {
                Data: data.data,
                Count: count.count,
                init: page,
                value: month,
                year: year,
                month: months,
              });
  }
  else{
      res.send("record not found")
  }

}


};

module.exports = { first, list };
