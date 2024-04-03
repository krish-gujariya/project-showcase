const exp = require("express");
var bds = require("body-parser");
let app = exp();

const {routes} = require("./routes/routes");

app.set("view engine", "ejs");
app.use(exp.static("views"));
app.use(exp.static("public"));
app.use(bds.urlencoded({ extended: true }));
app.use(exp.json());


//all routes 
app.use(routes);

app.listen(8000);
