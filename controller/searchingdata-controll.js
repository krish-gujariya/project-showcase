const dbms = require("../models/datasearchingdb");
const counts = require("../models/attendancedb");

const first = (req, res) => {

  try {
    seachdata();
  } catch (error) {
    console.log(error);
  }


  async function seachdata() {
    const data = await dbms.fetchdata(0);
    const count = await counts.counts();

    if (data.success) {
      res.render("searchingdata", {
        Property: data.property,
        Data: data.record,
        init: 1,
        Count: count.count,
        success: data.success,
        sm: 0,
      });
    } else {
      res.render("searchingdata", {
        message: data.message,
        success: data.success,
        init: 1,
      });
    }


  }
};

let search = false;
let tempsm = 0;
const list = (req, res) => {
  let page = req.query.pg;
  sm = req.query.sm;
  if (sm) {
    tempsm = sm;
  } else {
    sm = tempsm;
  }
  let x = (page - 1) * 20;
  if (!search) {
 
    try {
        seachdata();
      } catch (error) {
        console.log(error);
      }
    
    
      async function seachdata() {
        const data = await dbms.fetchdata(x);
        const count = await counts.counts();
    
        if (data.success) {
          res.render("searchingdata", {
            Property: data.property,
            Data: data.record,
            init: page,
            Count: count.count,
            success: data.success,
            sm: tempsm,
          });

        } else {
          res.render("searchingdata", {
            message: data.message,
            success: data.success,
            init: tempsm,
          });
        }   
      }
  } else {
    
    try {
        searchdata();
      } catch (error) {
        console.log(error);
      }
      async function searchdata() {
        const data = await dbms.search(condition, x);
        if (data.success) {
          res.render("searchingdata", {
            Property: data.property,
            Data: data.record,
            init: page,
            Count: data.count,
            success: data.success,
            sm: tempsm,
          });
        } else {
          res.render("searchingdata", {
            success: data.success,
            sm: tempsm,
            init: 1,
          });
        }
      }

  }
};

const postlist = (req, res) => {
  search = true;
  let page = req.query.pg;
  let x = (page - 1) * 20;

  let st = [];
  let sid = req.body.sid;

  if (sid) {
    st.push(" Student_Id in (" + sid + ")");
  }

  let fname = req.body.fname;
  if (fname) {
    st.push(" fname like '" + fname + "%'");
  }
  let lname = req.body.lname;
  if (lname) {
    st.push(" lname like '" + lname + "%'");
  }
  let city = req.body.city;
  if (city) {
    st.push(" city =  '" + city + "'");
  }

  let opt = req.body.opt;
  condition = "Where " + st.join(" " + opt + " ");

try {
    searchdata();
  } catch (error) {
    console.log(error);
  }
  async function searchdata() {
    const data = await dbms.search(condition, x);
    if (data.success) {
      res.render("searchingdata", {
        Property: data.property,
        Data: data.record,
        init: page,
        Count: data.count,
        success: data.success,
        sm: tempsm,
      });
    } else {
      res.render("searchingdata", {
        success: data.success,
        sm: tempsm,
        init: 1,
      });
    }
  }

};

module.exports = { first, list, postlist };
