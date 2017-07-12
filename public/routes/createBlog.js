var express = require("express"),
    router = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Blog = require('../models/userBlogs.js'),
    Project = require("../models/userProjects.js"),
    FccUsers = require("../models/fccUsers.js"),
    cloudinary = require("cloudinary"),
    multer = require("multer"),
    path = require('path'),
    upload = multer({ dest: 'public/img/avatars' });
    // methodOverride = require("method-override"),
    // expressSanitizer = require("express-sanitizer");

    router.use(function(req, res, next) {
      next()
    });

    router.post("/showUser/:_id/userBlog/new", upload.single('blogImage'), function(req, res) {
        var blogTitle = req.body.blogTitle;
        var blogImage = req.file.path;
        var blogBody = req.body.blogBody;
        cloudinary.uploader.upload(blogImage, function(result) {
          var blogImageRef = result.url;
          console.log(result);
          var newBlog = {blogTitle: blogTitle, blogImageRef: blogImageRef, blogBody: blogBody,};
          FccUsers.findById(req.params._id, function(err, userRef) {
            if(err) {
              console.log(err);
              res.redirect("/showUser/" + userRef._id);
            } else {
              Blog.create(newBlog, function(err, blog) {
                if (err) {
                  console.log(err);
                } else {
                  userRef.blogs.push(blog);
                  userRef.save();
                  res.redirect("/showUser/" + userRef._id);
                }
              });
            }
        });
      });
    });

  module.exports = router;
