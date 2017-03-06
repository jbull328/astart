var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    cloudinary = require("cloudinary"),
    app = express();

    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + '/public'));
    app.set(cloudinary.config({
        cloud_name: 'jbull328',
        api_key: '339719788594166',
        api_secret: 'Mqqa4AFIRujSei3S7Ixb9DuRC4E'
}));

mongoose.connect('mongodb://localhost/modestoFCCUsers');
var modestoFCCUsers = new mongoose.Schema({
    fName: String,
    lName: String,
    currentOccupation: String,
    description: String,
    userEmail: String,
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "project"
        }
    ]
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
      console.log(userRef);
      res.render("showUser", {userRef: userRef,});
    }
  });
});

app.get('/user/new', function(req, res) {
  res.render('userForm');
});

app.post('/user/new', function(req, res, next) {
  var fName = req.body.fName;
  var lName = req.body.lName;
  var currentOccupation = req.body.currentOccupation;
  var userEmail = req.body.userEmail;
  var description = req.body.description;
  var userAvatar = req.files.avatar.path;
  var newUser = {fName: fName, lName: lName, description: description, userEmail: userEmail,};
    FccUsers.create(newUser, function(err, newlyCreatedUser) {
      cloudinary.uploader.upload(userAvatar, function(result) {
      console.log(result);
    if (err) {
      console.log(err);
      res.render("landing")
    } else {
      res.redirect("/showUser/" + newlyCreatedUser._id);
    }
  });
});
});

app.listen(process.env.PORT || 3000, function() {
  console.log("The Modesto All Star Server is running");
});
