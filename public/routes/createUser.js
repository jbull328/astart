var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Project = require("../models/userProjects.js"),
    User = require("../models/fccUsers.js"),
    cloudinary = require("cloudinary"),
    multer = require("multer"),
    path = require('path'),
    upload = multer({ dest: 'public/img/avatars' });
    // methodOverride = require("method-override"),
    // expressSanitizer = require("express-sanitizer");

    router.use(function(req, res, next) {
      next()
    });

    router.post('/user/new', upload.single('avatar'), function(req, res, next) {

      var fName = req.body.name;
      var currentOccupation = req.body.currentOccupation;
      var userEmail = req.body.userEmail;
      var description = req.body.description;
      var avatar = req.file.path;
      cloudinary.uploader.upload(avatar, function(result) {
        var imageRef = result.url;

        console.log("image" + result + "~~~~~~~~~~~~~~~");

        var newUser = {fName: fName, lName: lName, description: description, currentOccupation: currentOccupation, userEmail: userEmail, imageRef: imageRef,};
        User.create(newUser, function(err, newlyCreatedUser) {

        if (err) {
          console.log(err);
          res.render("landing")
        } else {
            console.log(newlyCreatedUser.id);
            var authUserID = newlyCreatedUser.id;
            req.user.customData.authUserID = authUserID;
            req.user.customData.save(function(err) {
          if (err) {
            console.log(err);  // this will throw an error if something breaks when you try to save your changes
          } else {
            }
          });
          res.redirect("/showUser/" + newlyCreatedUser._id);
        }
      });
    });
    });

  module.exports = router;
