const exp = require("express");
var bds = require("body-parser");
let app = exp();

const controls = require('./controller/Controls');

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

app.get("/tictactoe", controls.tictactoe)
app.listen(8000);
