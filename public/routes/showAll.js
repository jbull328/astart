var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Project = require("../models/userProjects.js"),
    User = require("../models/fccUsers.js");
    // methodOverride = require("method-override"),
    // expressSanitizer = require("express-sanitizer");

    router.use(function(req, res, next) {
      next()
    });

    router.get("/showAll/", function(req, res) {
      User.find(function(err, userRef) {
        if (err) {
          console.log(err);
        } else {
          res.render("showAll", {userRef: userRef, user: req.user,});
        }
      });
    
    });

  module.exports = router;
