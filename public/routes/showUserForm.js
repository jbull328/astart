var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Project = require("../models/userProjects.js"),
    User = require("../models/user.js"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");


    //This router diplsays the newUser form. Logic is built in,
    //if the user has already signed up this form is skipped.
    router.use(function(req, res, next) {
      next()
    });

    router.get('/user/new', function(req, res) {
      var userId = req.user.customData.authUserID;
      if (req.user.customData.authUserID != null) {
          res.redirect('/showUser/' + userId);
      } else {

          res.render('userForm');
      }
    });

module.exports = router;
