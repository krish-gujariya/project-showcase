const dbms = require("../models/resultdb");
const count1 = require("../models/pagginationdb");

const first = (req, res) => {
  let x = 1;
  let pg = 0;

  try {
    resultdata();
  } catch (error) {
    console.log(error);
  }

  async function resultdata() {
    const data = await dbms.RecordQuerry(pg);
    if (data.success) {
      const count = await count1.counts();
      if (count.success) {
        res.render("Result", {
          Data: data.data,
          Count: count.count,
          init: x,
        });
      }
    }
  }
};

const list = (req, res) => {
  let x = (req.query.page - 1) * 200;
  let page = req.query.page;

  try {
    resultdata();
  } catch (error) {
    console.log(error);
  }

  async function resultdata() {
    const data = await dbms.RecordQuerry(x);
    if (data.success) {
      const count = await count1.counts();
      if (count.success) {
        res.render("Result", {
          Data: data.data,
          Count: count.count,
          init: page,
        });
      }
    }
  }
};

const result = (req, res) => {
  let val = req.query.value;

  try {
    marksheetdata();
  } catch (error) {
    console.log(error);
  }

  async function marksheetdata() {
    const gradedata = await dbms.grade(val);
    const attendancedata = await dbms.Attenper(val);
    const resultdata = await dbms.Resultdata(val);
    if (resultdata.success) {
      res.render("Marksheet", {
        Data: resultdata.data,
        Info: gradedata.data[0],
        roll: val,
        perc: attendancedata.data[0],
      });
    }
  }
};

module.exports = {
  first,
  list,
  result,
};
