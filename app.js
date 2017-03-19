var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    cloudinary = require("cloudinary"),
    multer = require("multer"),
    path = require('path'),
    upload = multer({ dest: 'public/img/avatars' }),
    stormpath = require('express-stormpath'),
    dotenv = require("dotenv"),
    app = express();

    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + '/public'));
    dotenv.load();
    cloudinary.config({
        cloud_name: 'jbull238',
        api_key: '339719788594166',
        api_secret: 'Mqqa4AFIRujSei3S7Ixb9DuRC4E'
});

  app.use(stormpath.init(app, {
  apiKeyId:     process.env.STORMPATH_API_KEY_ID || 'key',
  apiKeySecret: process.env.STORMPATH_API_KEY_SECRET || 'secret',
  secretKey:    process.env.STORMPATH_SECRET_KEY || 'key',
  application:  process.env.STORMPATH_URL || 'url',
  expand: {
    customData: true,
  },
  web: {
   login: {
     enabled: true,
     nextUri: "/showAll/"
   }
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
            ref: "Project"
        }
    ]
});
var FccUsers = mongoose.model("FccUsers", modestoFCCUsers);

var userProjects = new mongoose.Schema({
  projTitle: String,
  projDescription: String,
  projImageRef: String,
  projLink: String,
  // projLikes: [
  //   {
  //
  //   }
  // ] ,
  // projComments: [
  //   {
  //
  //   }
  // ]
});
var Project = mongoose.model("Project", userProjects);

app.get("/", function(req, res) {
  res.render('landing');
});

app.get('/showUser/:id', stormpath.authenticationRequired, function(req, res) {
  FccUsers.findById(req.params.id).populate('projects').exec(function(err, userRef) {
    if (err) {
      console.log(err);
    } else {
      Project.find(function(err, projects) {
        if (err) {
          console.log(err);
        } else {
          console.log(userRef);
          console.log(projects);
          res.render("showUser", {userRef: userRef, projects: projects,});
        }
    });
    }
  });
});

app.get('/user/new', stormpath.authenticationRequired, stormpath.getUser, function(req, res) {
  res.render('userForm');
});

app.get("/showAll/", stormpath.getUser, function(req, res) {
  FccUsers.find(function(err, allUsers) {
    if (err) {
      console.log(err);
    } else {
      res.render("showAll", {allUsers: allUsers,});
    }
  });

})

app.post('/user/new',stormpath.authenticationRequired, stormpath.getUser, upload.single('avatar'), function(req, res, next) {
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

app.get('/showUser/:_id/projects/new', stormpath.authenticationRequired, stormpath.getUser, function(req, res) {
  FccUsers.findById(req.params._id, function(err, userRef) {
  if (err) {
    console.log(err);
  } else {
    console.log(userRef);
    res.render("projects/new", {userRef: userRef,});
  }
});
});

app.post("/showUser/:_id/projects", stormpath.authenticationRequired, stormpath.getUser, upload.single('projImage'), function(req, res) {
  var projTitle = req.body.projTitle;
  var projDescription = req.body.projDescription;
  var projLink = req.body.projLink;
  var projImage = req.file.path;
  cloudinary.uploader.upload(projImage, function(result) {
    var projImageRef = result.url;

  console.log(result);
  var newProject = {projTitle: projTitle, projDescription: projDescription, projImageRef: projImageRef, projLink: projLink,};
  FccUsers.findById(req.params._id, function(err, userRef) {
    if (err) {
      console.log(err);
      console.log(userRef);
      res.redirect("/showUser/" + userRef._id);
    } else {
      Project.create(newProject, function(err, project){
        if(err) {
          console.log(err);
        } else {
          console.log("Success " + userRef);
          userRef.projects.push(project);
          userRef.save();
          res.redirect("/showUser/" + userRef._id);
        }
      });
    }
  });
  })
});

app.listen(process.env.PORT || 3000, function() {
  console.log("The Modesto All Star Server is running");
});
