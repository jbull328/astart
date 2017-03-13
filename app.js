var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    cloudinary = require("cloudinary"),
    multer = require("multer"),
    path = require('path'),
    upload = multer({ dest: 'public/img/avatars' }),
    stormpath = require('express-stormpath'),
    app = express();

    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + '/public'));
    cloudinary.config({
        cloud_name: 'jbull238',
        api_key: '339719788594166',
        api_secret: 'Mqqa4AFIRujSei3S7Ixb9DuRC4E',
});

  app.use(stormpath.init(app, {
  apiKeyFile: '/.stormpath/apiKey.properties',
  apiKeyId:     process.env.STORMPATH_API_KEY_ID || 'key',
  apiKeySecret: process.env.STORMPATH_API_KEY_SECRET || 'secret',
  secretKey:    process.env.STORMPATH_SECRET_KEY || 'key',
  application:  process.env.STORMPATH_URL || 'url',
  expand: {
    customData: true,
  }
}));

mongoose.connect('mongodb://localhost/modestoFCCUsers');
var modestoFCCUsers = new mongoose.Schema({
    fName: String,
    lName: String,
    currentOccupation: String,
    description: String,
    userEmail: String,
    imageRef: String,
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userProject"
        }
    ]
});

var projects = new mongoose.Schema({
  projTitle: String,
  projDescription: String,
  projImageRef: String,
  projLink: String,
  projLikes: [
    {

    }
  ] ,
  projComments: [
    {

    }
  ]
})
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

app.post('/user/new', upload.single('avatar'), function(req, res, next) {
  var fName = req.body.fName;
  var lName = req.body.lName;
  var currentOccupation = req.body.currentOccupation;
  var userEmail = req.body.userEmail;
  var description = req.body.description;
  var avatar = req.file.path;
  cloudinary.uploader.upload(avatar, function(result) {
    var imageRef = result.url;

  console.log(result);

  var newUser = {fName: fName, lName: lName, description: description, currentOccupation: currentOccupation, userEmail: userEmail, imageRef: imageRef,};
  FccUsers.create(newUser, function(err, newlyCreatedUser) {

  if (err) {
    console.log(err);
    res.render("landing")
  } else {
    res.redirect("/showUser/" + newlyCreatedUser._id);
  }
});
});
});

app.get('/showUser/:_id/projects/new', function(req, res) {
  FccUsers.findById(req.params._id, function(err, userRef) {
  if (err) {
    console.log(err);
  } else {
    console.log(userRef);
    res.render("projects/new", {userRef: userRef,});
  }
});
});

app.post("/showUser/:_id/projects/new", function(req, res) {

});

app.listen(process.env.PORT || 3000, function() {
  console.log("The Modesto All Star Server is running");
});
