const dbms = require("../models/delimetersdb");
const counts = require("../models/attendancedb");

const first = (req, res) => {
  try {
    fetchrecords();
  } catch (error) {
    console.log(error);
  }
  async function fetchrecords() {
    const data = await dbms.fetchdata(0);
    const count = await counts.counts();
    if (count.success) {
      res.render("delimetersearch", {
        Property: data.property,
        Data: data.record,
        init: 1,
        Count: count.count,
        success: data.success,
        sm: 0,
        arr: errarr,
        querry: "",
      });
    } else {
      res.render("delimetersearch", {
        success: data.success,
        init: 1,
        querry: querry,
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
      fetchrecords();
    } catch (error) {
      console.log(error);
    }
    async function fetchrecords() {
      const data = await dbms.fetchdata(x);
      const count = await counts.counts();
      if (count.success) {
        res.render("delimetersearch", {
          Property: data.property,
          Data: data.record,
          init: page,
          Count: count.count,
          success: data.success,
          sm: tempsm,
          arr: errarr,
          querry: querry,
        });
      } else {
        res.render("delimetersearch", {
          success: data.success,
          sm: tempsm,
          init: 1,
          querry: querry,
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
        res.render("delimetersearch", {
          Property: data.property,
          Data: data.record,
          init: page,
          Count: data.count,
          success: data.success,
          sm: tempsm,
          arr: errarr,
          querry: querry,
        });
      } else {
        res.render("delimetersearch", {
          success: data.success,
          sm: tempsm,
          init: 1,
          arr: errarr,
          querry: querry,
        });
      }
    }
  }
};

let errarr = [];
let condition = "";
let querry;

const postlist = (req, res) => {
  search = true;
  let page = req.query.pg;
  let x = (page - 1) * 20;

  let fname = [];
  let lname = [];
  let city = [];
  let phone = [];
  let email = [];

  querry = req.body.wholeq;
  let querry1 = querry.split(" ").join("");
  let asd = querry1
    .replaceAll("_", " _")
    .replaceAll("^", " ^")
    .replaceAll("$", " $")
    .replaceAll(":", " :")
    .replaceAll("}", " }")
    .split(" ");
  asd.shift();

  asd.forEach((element) => {
    let a = element.at(0);
    switch (a) {
      case "_": {
        fname.push("'" + element.substring(1) + "%'"); //"aa%"
        message = false;
        break;
      }

      case "^": {
        lname.push("'" + element.substring(1) + "%'");
        message = false;
        break;
      }

      case "$": {
        city.push("'" + element.substring(1) + "%'");
        message = false;
        break;
      }

      case "}": {
        phone.push("'" + element.substring(1) + "%'");
        message = false;
        break;
      }

      case ":": {
        email.push("'" + element.substring(1) + "%'");
        message = false;
        break;
      }

      default: {
        break;
      }
    }
  });

  let subq = [];
  if (!fname.length == 0) {
    subq.push(" (fname like " + fname.join(" or fname like ") + ")");
  }

  if (!lname.length == 0) {
    subq.push(" (lname like " + lname.join(" or lname like ") + ")");
  }

  if (!phone.length == 0) {
    subq.push("( phone_no like " + phone.join(" or phone_no like ") + ")");
  }

  if (!email.length == 0) {
    subq.push(" (email like " + email.join(" or email like ") + ")");
  }

  if (!city.length == 0) {
    subq.push("( city like " + city.join(" or city like ") + ")");
  }

  if (!subq.length == 0) {
    condition = "Where " + subq.join(" and ");
  }

  try {
    searchdata();
  } catch (error) {
    console.log(error);
  }
  async function searchdata() {
    const data = await dbms.search(condition, x);
    if (data.success) {
      res.render("delimetersearch", {
        Property: data.property,
        Data: data.record,
        init: page,
        Count: data.count,
        success: data.success,
        sm: tempsm,
        arr: errarr,
        querry: querry,
      });
    } else {
      res.render("delimetersearch", {
        success: data.success,
        sm: tempsm,
        init: 1,
        arr: errarr,
        querry: querry,
      });
    }
  }
};

module.exports = { first, list, postlist };
