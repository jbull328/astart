var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Project = require("../models/userProjects.js"),
    FccUsers = require("../models/fccUsers.js"),
    stormpath = require('express-stormpath');
    // methodOverride = require("method-override"),
    // expressSanitizer = require("express-sanitizer");

    router.use(function(req, res, next) {
      next()
    });

    router.get('/showUser/:id', stormpath.getUser, function(req, res) {
      FccUsers.findById(req.params.id).populate('projects').exec(function(err, userRef) {

        if (err) {
          console.log(err);
        } else {
          Project.find(function(err, projects) {
            if (err) {
              console.log(err);
            } else {
              if (req.user && userRef._id == req.user.customData.authUserID) {

                res.render("showUser", {userRef: userRef, projects: projects,});
              } else {
                res.render("showUserPublic", {userRef: userRef, projects: projects,});
              }
            }
        });
        }
      });
    });

module.exports = router;
