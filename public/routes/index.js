var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Project = require("../models/userProjects.js");
var Blog = require('../models/userBlogs.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});


router.get("/showAll/", ensureAuthenticated, function(req, res) {
  User.find(function(err, userRef) {
    if (err) {
      console.log(err);
    } else {
      res.render("showAll", {userRef: userRef, user: req.user,});
    }
  });

});;

router.get('/showUser/:id', function(req, res) {
  User.findById(req.params.id).populate('projects blogs').exec(function(err, userRef) {
    if (err) {
      console.log(err);
    } else {
      Project.find(function(err, projects) {
        if (err) {
          console.log(err);
        } else {
          Blog.find(function(err, blogs) {
          if (req.user && userRef._id) {

            res.render("showUser", {userRef: userRef, projects: projects, blogs: blogs,});
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
  res.redirect('/users/login');
}


module.exports = router;
