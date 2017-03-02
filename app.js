var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/modestoFCC');
var modestoFCCUsers = new mongoose.Schema({
    fName: String,
    LName: String,
    description: String,
    image: String,
    email: String,
    // projects: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "project"
    //     }
    // ]
});
var FccUsers = mongoose.model("FccUsers", modestoFCCUsers);

app.get("/", function(req, res) {
  res.render("landing");
});

app.get('/showUser/:id', function(req, res) {
  FccUsers.findById(req.params.id, function(err, userRef) {
    if (err) {
      console.log(err);
    } else {
      res.render("showUser", {user: userRef});
    }
  });
});

app.get('/user/new', function(req, res) {
  res.render('userForm');
});

app.post('/user', function(req, res) {
  var fName = req.body.fName;
  var lName = req.body.lName;
  var email = req.body.email;
  var description = req.body.discription;
  var newUser = {fName: fName, lName: lName, email: email, description: description,};
  FccUsers.create(newUser, function(err, newlyCreatedUser) {
    if (err) {
      console.log(err);
    }
    res.redirect("/showUser/:id");
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("The Modesto All Star Server is running");
});
