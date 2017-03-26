var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Project = require("../models/userProjects.js"),
    FccUsers = require("../models/fccUsers.js"),
    cloudinary = require("cloudinary"),
    multer = require("multer"),
    path = require('path'),
    upload = multer({ dest: 'public/img/avatars' }),
    stormpath = require('express-stormpath');
    // methodOverride = require("method-override"),
    // expressSanitizer = require("express-sanitizer");

    router.use(function(req, res, next) {
      next()
    });

    router.post("/showUser/:_id/projects", stormpath.authenticationRequired, stormpath.getUser, upload.single('projImage'), function(req, res) {
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
    });
    });

module.exports = router;
