var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Project = require("../models/userProjects.js"),
    FccUsers = require("../models/fccUsers.js"),
    stormpath = require('express-stormpath');
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

    router.use(function(req, res, next) {
      next()
    });

    router.get('/showUser/:_id/projects/new', stormpath.authenticationRequired, stormpath.getUser, function(req, res) {
      FccUsers.findById(req.params._id, function(err, userRef) {
      if (err) {
        console.log(err);
      } else {
        console.log(userRef);
        res.render("projects/new", {userRef: userRef,});
      }
    });
    });

module.exports = router;
