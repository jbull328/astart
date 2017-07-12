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
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

    router.use(function(req, res, next) {
      next()
    });

    router.put("/userEdit/:_id", function(req, res) {
      // req.body.customer.body = req.sanitize(req.customer.customer.body);

      FccUsers.findByIdAndUpdate(req.params._id, req.body.userRef, function(err, userRef) {
        var id = req.params._id;
        if (err) {
          console.log(err);
          res.redirect("/showUser/" + id);
        } else {
          console.log(userRef);
          res.redirect("/showUser/" + id);
        }
      });
    });


module.exports = router;
