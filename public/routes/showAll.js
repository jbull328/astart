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

    router.get("/showAll/", stormpath.getUser, function(req, res) {
      FccUsers.find(function(err, allUsers) {
        if (err) {
          console.log(err);
        } else {
          res.render("showAll", {allUsers: allUsers,});
        }
      });

    });

  module.exports = router;