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

    router.get('userEdit/:_id', stormpath.loginRequired, stormpath.getUser, function(req, res) {
      FccUsers.findById(req.params._id, function(err, userRef) {
        if (err) {
          console.log(err);
        }  else {
          res.render('userEdit', {userRef: userRef,});
        }
      });
    });

    router.put("/userEdit/:_id",  stormpath.loginRequired, stormpath.getUser, function(req, res) {
      // req.body.customer.body = req.sanitize(req.customer.customer.body);
      FccUsers.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser) {
        if (err) {
          console.log(err);
          res.redirect("showUser", {updatedUser: updatedUser,});
        } else {
          res.redirect("showUser", {updatedUser: updatedUser,});
        }
      });
    });


module.exports = router;
