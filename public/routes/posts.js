var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user.js');
var multer = require('multer');
var upload = multer({ dest: 'public/img/avatars' });
var Project = require("../models/userProjects.js");
var Blog = require('../models/userBlogs.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cloudinary = require("cloudinary");
var dotenv = require("dotenv");


dotenv.load();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

//   Project routes
router.get('/:_id/projects/new', ensureAuthenticated, function(req, res) {
    User.findById(req.params._id, function(err, userRef) {
    if (err) {
      console.log(err);
    } else {
      console.log(userRef);
      res.render("projects/new", {userRef: userRef,});
    }
  });
  });

router.post("/:_id/projects", upload.single('projImage'), ensureAuthenticated, function(req, res) {
    var projTitle = req.body.projTitle;
    var projDescription = req.body.projDescription;
    var projLink = req.body.projLink;
    var projImage = req.file.path;
    cloudinary.uploader.upload(projImage, function(result) {
      var projImageRef = result.url;
      console.log(result);
      var newProject = {projTitle: projTitle, projDescription: projDescription, projImageRef: projImageRef, projLink: projLink,};
      User.findById(req.params._id, function(err, userRef) {
        if (err) {
          console.log(err);
          console.log(userRef);
          res.redirect("/users/showUser/" + userRef._id);
        } else {
          Project.create(newProject, function(err, project){
            if(err) {
              console.log(err);
            } else {
              console.log("Success " + userRef);
              userRef.projects.push(project);
              userRef.save();
              res.redirect("/users/showUser/" + userRef._id);
            }
          });
        }
      });
  });
  });


 

// blog routes

router.get('/:_id/userBlog/new', ensureAuthenticated, function(req, res) {
    User.findById(req.params._id, function(err, userRef) {
    if (err) {
      console.log(err);
    } else {
      console.log(userRef);
      res.render("userBlogForm", {userRef: userRef,});
    }
  });
  });

 

  router.post("/:_id/userBlog/new", upload.single('blogImage'), ensureAuthenticated, function(req, res) {
    var blogTitle = req.body.blogTitle;
    var blogImage = req.file.path;
    var blogBody = req.body.blogBody;
    cloudinary.uploader.upload(blogImage, function(result) {
      var blogImageRef = result.url;
      console.log(result);
      var newBlog = {blogTitle: blogTitle, blogImageRef: blogImageRef, blogBody: blogBody,};
      User.findById(req.params._id, function(err, userRef) {
        if(err) {
          console.log(err);
          res.redirect("/users/showUser/" + userRef._id);
        } else {
          Blog.create(newBlog, function(err, blog) {
            if (err) {
              console.log(err);
            } else {
              userRef.blogs.push(blog);
              userRef.save();
              res.redirect("/users/showUser/" + userRef._id);
            }
          });
        }
    });
  });
});


    

// video routes


function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/users/login');
  }

module.exports = router;