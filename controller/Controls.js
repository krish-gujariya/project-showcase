var dbms = require("../models/DbConnection");
var ucheck = require("../models/usercheck");
var bds = require("body-parser");
var crypto = require("crypto");
const bcrypt = require("bcrypt");
const salt = 10;

const registrationpage = (req, res) => {
  res.render("Registration", { link: "" });
};

const datainsertion = (req, res) => {
  let { fname, lname, email, phone, uname } = req.body;
  usercheck();

  async function usercheck() {
    let field = await ucheck.availablefield(uname, email, phone);
    let active = await ucheck.activeuser(uname);
    if (active.success) {
      try {
        crypto.randomBytes(10, async (err, buff) => {
          const expdate = Date.now() + 6000;
          let conn = await dbms.createconnection();
          let uactive = active.id + buff.toString("hex");
          console.log(uactive);
          let sql = `Update users set activationcode = ?, expires =? where id = ? ;`;
          await conn.query(sql, [uactive, expdate, active.id]);
          var link = `http://localhost:8000/activate?code=${uactive}`;
          res.json({ link: link, useractive: true });
        });
      } catch (error) {
        console.log(error);
      }
    } else if (field.length == 0) {
      insertdata();
    } else {
      res.json({ link: false, field: field });
    }
  }

  async function insertdata() {
    let conn = await dbms.createconnection();
    let links;
    const expdate = Date.now() + 6000;
    let sql = `Insert into users(fname,lname,email,phone,username,expires) values ?`;
    let values = [[fname, lname, email, phone, uname, expdate]];
    try {
      let result = await conn.query(sql, [values]);
      let id = result[0].insertId;

      crypto.randomBytes(10, async (err, buff) => {
        let uactive = id + buff.toString("hex");
        console.log(uactive);
        let sql = `Update users set activationcode = ? where id = ? ;`;
        await conn.query(sql, [uactive, id]);
        var link = `http://localhost:8000/activate?code=${uactive}`;
        console.log(link);
        res.json({ link: link });
      });
    } catch (error) {
      console.log(error);
    }

    return links;
  }
};

const activateuser = (req, res) => {
  let code = req.query.code;

  async function checkexpiers() {
    let sql = `select expires from users where activationcode =?`;
    const conn = await dbms.createconnection();
    let result = await conn.query(sql, code);
    exptime = result[0][0].expires;

    if (Date.now() <= exptime) {
      res.render("password", { code: code });
    } else {
      res.render("password", { code: false });
    }
  }

  checkexpiers();
};

const createpassword = (req, res) => {
  let code = req.params["code"];
  let { password } = req.body;

  async function activateuser() {
    let saltc = bcrypt.genSaltSync(salt);
    let hashpassword = bcrypt.hashSync(password, saltc);
    let sql = `Update users set hashpassword = ?, salt =? where activationcode = ?`;
    let conn = await dbms.createconnection();
    try {
      await conn.query(sql, [hashpassword, saltc, code]);
    } catch (error) {
      console.log(error);
    }
  }

  activateuser();
  res.json("Your Account has been successfully Created");
};

const loginpage = (req, res) => {
  res.render("login.ejs");
};

const verifyuser = (req, res) => {
  let { uname, password } = req.body;

  verifies();
  async function verifies() {
    const data = await ucheck.finduser(uname);
    console.log(data);
    if (data.success) {
      let cred = data.credential;
      let asdf = bcrypt.hashSync(password, cred.salt);
      console.log(password, asdf);
      if (asdf == cred.hashpassword) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } else {
      res.json({ success: false });
    }
  }
};

const dashboard = (req, res) => {
  res.render("dashboard.ejs");
};

const dynamictable = (req,res)=>{
  res.render("dynamictable.ejs")
}

const kukukube = (req,res)=>{
  res.render("kukukube.ejs")
}

const domevent = (req,res)=>{
  res.render("domevent.ejs")
}

const tictactoe = (req,res)=>{
  res.render("tictactoe.ejs")
}

module.exports = {
  registrationpage,
  datainsertion,
  activateuser,
  createpassword,
  loginpage,
  verifyuser,
  dashboard,
  dynamictable,
  kukukube,
  domevent,
  tictactoe
};
