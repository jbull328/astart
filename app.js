var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

    app.set('views', __dirname + '/views');
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.render("landing");
});

app.get('/user', function(req, res) {
  res.render("showUser");
});

app.get('/user/new', function(req, res) {
  res.render('userForm');
});
app.listen(process.env.PORT || 3000, function() {
  console.log("The Modesto All Star Server is running");
});
