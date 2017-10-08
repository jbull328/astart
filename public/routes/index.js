var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Project = require("../models/userProjects.js");
var Blog = require('../models/userBlogs.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});

// Show all public. This is for non logged in users, and can be changes later for a more dry aproach*/
router.get("/showAllPublic/", function(req, res) {
  User.find(function(err, userRef) {
    if (err) {
      console.log(err);
    } else {
      res.render("showAll", {userRef: userRef,});
    }
  });

});

router.get("/showAll/", ensureAuthenticated, function(req, res) {
  User.find(function(err, userRef) {
    if (err) {
      console.log(err);
    } else {
      res.render("showAll", {userRef: userRef,});
    }
  });

});;

router.get('/showUser/:id', ensureAuthenticated, function(req, res) {
  User.findById(req.params.id).populate('projects blogs').exec(function(err, userRef) {

    if (err) {
      console.log(err);
    } else {
      Project.find(function(err, projects) {
        if (err) {
          console.log(err);
        } else {
          Blog.find(function(err, blogs) {
          if (req.user) {

            res.render("showUser", {userRef: userRef, projects: projects, blogs: blogs, isLoggedin: isLoggedin(),});
          } else {
            res.render("showUserPublic", {userRef: userRef, projects: projects, blogs: blogs,});
          }
        });
      }
    });
    }
  });
});


function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/user/login');
}


module.exports = router;
