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
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

    router.use(function(req, res, next) {
      next()
    });

    router.get('/userEdit/:_id', stormpath.authenticationRequired, function(req, res) {
      FccUsers.findById(req.params._id, function(err, userRef) {
        if (err) {
          console.log(err);
        }  else {
          res.render('userEdit.ejs', {userRef: userRef,});
        }
      });
    });

  
module.exports = router;
