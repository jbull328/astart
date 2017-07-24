var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Project = require("../models/userProjects.js"),
    FccUsers = require("../models/fccUsers.js"),
    flash = require('connect-flash'),
    passport = require("passport");

    router.use(function(req, res, next) {
      next()
    });

    router.get("/login/", function(req, res) {
          res.status(200, { message: req.flash('loginMessage')});

    });

  module.exports = router;
