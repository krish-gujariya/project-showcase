const dbms =require("../models/sqlquerrydb");


const first = (req, res) => {
    let x = 0;
    let pg = 1;
    res.render("sqlresult", {
      init: pg,
      Count: 0,
      pos: x,
      value: "",
      select: false,
    });   
};

const list = (req, res) => {
    let x = (req.query.pg - 1) * 20;
    let page = req.query.pg;
    ab = req.body.querry;
    if (!ab.match(/select/i)) {
      res.render("sqlresult", {
        init: 0,
        Count: 0,
        pos: 1,
        select: true,
        value: "",
      });
      return 0;
    }
    dbms
      .RecordQuerry(ab, x)
      .then((data) => {
          dbms.counts(ab).then((data1) => {
              if (data1.success) {
            let num = data1.data;
            res.render("sqlresult", {
              Data: data.data.students,
              Property: data.data.props,
              init: page,
              Count: num[0].count,
              value: ab,
              pos: 1,
              select: false,
              success: true,
            });
          } else {
              let w = data.data;
              if(w.match(/You have an error in your SQL syntax/i)){
                  w = 'You have error in sql syntax';
              }
            res.render("sqlresult", {
              init: 0,
              Count: 0,
              success: data.success,
              pos: 1,
              select: false,
              value: "",
              errmessage: w,
            });
          }
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }


  const getlist = (req, res) => {
    let x = (req.query.pg - 1) * 20;
    let page = req.query.pg;
    dbms.RecordQuerry(ab, x).then((data) => {
      dbms.counts(ab).then((data1) => {
        let num = data1.data;
        res.render("sqlresult", {
          Data: data.data.students,
          Property: data.data.props,
          init: page,
          Count: num[0].count,
          value: ab,
          pos: 1,
          select: false,
          success: true,
        });
      });
    });
  }

module.exports = {first, list, getlist}