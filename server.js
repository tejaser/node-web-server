const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n");
  next();
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to my website.",
    currentYear: new Date().getFullYear()
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "this is a bad request."
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page",
    currentYear: new Date().getFullYear()
  });
});

app.listen(3000, () => {
  console.log("server is running at PORT:3000");
});
