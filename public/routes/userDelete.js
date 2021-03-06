var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Project = require("../models/userProjects.js"),
    User = require("../models/user.js"),
    cloudinary = require("cloudinary"),
    multer = require("multer"),
    path = require('path'),
    upload = multer({ dest: 'public/img/avatars' }),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

    router.use(function(req, res, next) {
      next()
    });


    router.delete("/userDelete/:_id", function(req, res) {
      User.findByIdAndRemove(req.params._id, function(err, userRef) {
        if (err) {
          console.log(err);
        } else {
          console.log("Delete user---" + userRef)
          res.redirect('/showAll/');
        }
      });
    });

module.exports = router;
