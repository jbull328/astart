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

    router.get('/showUser/:_id/userBlog', function(req, res) {
      User.findById(req.params._id, function(err, userRef) {
        if (err) {
          console.log(err);
        }  else {
          Blog.findById(req.params._id, function(err, blog) {
            if (err) {
              console.log('blog find error --->>')
            } else {
              console.log('this is the blog----' + blog);
              res.render('blog', {userRef: userRef, blog: blog,});
            }
          });
        }
      });
    });


module.exports = router;
