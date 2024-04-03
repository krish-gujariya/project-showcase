const exp = require("express");
var bds = require("body-parser");
let app = exp();

const controls = require("./controller/Controls");
const paging = require("./controller/Paggination");
const result = require("./controller/resultcontrol");
const attendance = require("./controller/attendance-controll");
const sql = require("./controller/sqlquerry-controll");
const sort = require("./controller/sorting-record");
const search = require("./controller/searchingdata-controll");
const delimeter = require("./controller/delimeter-search");
const {routes} = require("./routes/routes");

app.set("view engine", "ejs");
app.use(exp.static("views"));
app.use(exp.static("public"));
app.use(bds.urlencoded({ extended: true }));
app.use(exp.json());


//all routes 
app.use(routes);

app.listen(8000);
