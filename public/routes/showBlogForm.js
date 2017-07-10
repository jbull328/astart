var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Blog = require("../models/userBlogs.js"),
    Project = require("../models/userProjects.js"),
    FccUsers = require("../models/fccUsers.js"),
    stormpath = require('express-stormpath');
    // methodOverride = require("method-override"),
    // expressSanitizer = require("express-sanitizer");

    router.use(function(req, res, next) {
      next()
    });

    router.get('/showUser/:_id/userBlog/new', function(req, res) {
      FccUsers.findById(req.params._id, function(err, userRef) {
      if (err) {
        console.log(err);
      } else {
        console.log(userRef);
        res.render("userBlogForm", {userRef: userRef,});
      }
    });
    });

  module.exports = router;
