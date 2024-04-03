const exp = require("express");
const bds = require("body-parser");

const routes =exp();

routes.set("view engine", "ejs");
routes.use(exp.static('views'));
routes.use(exp.static('public'));
routes.use(bds.urlencoded({ extended: true }));
routes.use(exp.json());

const controls = require('../controller/Controls');
const paging = require("../controller/Paggination");
const result = require("../controller/resultcontrol");
const attendance = require("../controller/attendance-controll");
const sql = require("../controller/sqlquerry-controll");
const sort = require("../controller/sorting-record");
const search = require("../controller/searchingdata-controll");
const delimeter = require("../controller/delimeter-search");


routes.get("/",controls.loginpage)
routes.get("/register", controls.registrationpage);
routes.post("/savedata", controls.datainsertion);
routes.get("/activate", controls.activateuser);
routes.post("/end/:code", controls.createpassword);
routes.post("/verify", controls.verifyuser);

//Project dashboard
routes.get("/dashboard", controls.dashboard);

//dynamic table
routes.get("/dynamic-table", controls.dynamictable);

//kuku-cube
routes.get("/kuku-kube", controls.kukukube);

//DOM table event
routes.get("/dom-event", controls.domevent);

//tic-tac-toe
routes.get("/tictactoe", controls.tictactoe);

//sorting
routes.get("/sorting", controls.sort);

//web-landing pages
routes.get("/ehya", controls.ehya);
routes.get("/awan", controls.awan);
routes.get("/hirex", controls.hirex);


//Paggination Task
routes.get("/paggination", paging.first);
routes.get("/list", paging.pagginate);


// Result data
routes.get("/result", result.first);
routes.get("/result-list", result.list);
routes.get("/student-result", result.result);

//Student-attendance record
routes.get("/student-attendance", attendance.first);
routes.get("/attendance-list", attendance.list);
 

// data search using sql querry
routes.get("/sqlquerry", sql.first);
routes.post("/sql-list", sql.list);
routes.get("/sql-list", sql.getlist);

 
// sorting data
routes.get("/sql-sorting", sort.first);
routes.get("/sorting-list", sort.list);

//search data
routes.get("/searching-data", search.first);
routes.get("/search-list", search.list);
routes.post("/search-list", search.postlist);

// delimeter search

routes.get("/delimeter-search", delimeter.first);
routes.get("/delimeter-list", delimeter.list);
routes.post("/delimeter-list", delimeter.postlist);

// Fetch api on JSON placeholders
routes.get("/fetch-api", controls.fetch);


module.exports = {routes}