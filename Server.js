const exp = require("express");
var bds = require("body-parser");
let app = exp();

const controls = require('./controller/Controls');
const paging = require("./controller/Paggination");
const result = require("./controller/resultcontrol");
const attendance = require("./controller/attendance-controll");
const sql = require("./controller/sqlquerry-controll");
const sort = require("./controller/sorting-record");
const search = require("./controller/searchingdata-controll");
const delimeter = require("./controller/delimeter-search");

app.set("view engine", "ejs");
app.use(exp.static('views'));
app.use(exp.static('public'));
app.use(bds.urlencoded({ extended: true }));
app.use(exp.json());

app.get("/register",controls.registrationpage);

app.post("/savedata",controls.datainsertion)


app.get("/activate",controls.activateuser)

app.post("/end/:code",controls.createpassword)


app.get("/",controls.loginpage)


app.post("/verify",controls.verifyuser)

app.get("/dashboard", controls.dashboard);

app.get("/dynamic-table", controls.dynamictable);

app.get("/kuku-kube",controls.kukukube);

app.get("/dom-event",controls.domevent);

app.get("/tictactoe", controls.tictactoe);

app.get("/sorting", controls.sort);

app.get("/ehya",controls.ehya);

app.get("/awan",controls.awan);

app.get("/hirex",controls.hirex);

app.get("/paggination", paging.first);

app.get("/list", paging.pagginate);

app.get("/result", result.first);

app.get("/result-list", result.list);

app.get("/student-result", result.result);

app.get("/student-attendance", attendance.first);

app.get("/attendance-list", attendance.list);

app.get("/sqlquerry", sql.first);

app.post("/sql-list", sql.list);

app.get("/sql-list", sql.getlist);

app.get("/sql-sorting", sort.first);

app.get("/sorting-list", sort.list);

app.get("/searching-data", search.first);

app.get("/search-list", search.list);

app.post("/search-list", search.postlist);

app.get("/delimeter-search", delimeter.first);

app.get("/delimeter-list", delimeter.list);

app.post("/delimeter-list", delimeter.postlist);

app.get("/fetch-api", controls.fetch);


app.listen(8000);
