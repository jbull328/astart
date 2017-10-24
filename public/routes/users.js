var express = require('express');
var router = express.Router();
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Project = require("../models/userProjects.js");
var Blog = require('../models/userBlogs.js');
var methodOverride = require("method-override");
var cloudinary = require("cloudinary");
var path = require('path');
var upload = multer({ dest: './img/avatars' });
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var dotenv = require("dotenv");

var User = require('../models/fccUsers.js');


/* GET users listing. */

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local',{failureRedirect:'login', failureFlash: 'Invalid username or password'}),
  function(req, res) {
   req.flash('success', 'You are now logged in');
   res.redirect('/showAll');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done){
  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message:'Invalid Password'});
      }
    });
    
  });
}));

router.post('/register', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var currentOccupation = req.body.currentOccupation;
  var description = req.body.description;
  

      var newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password,
        currentOccupation: currentOccupation,
        description: description,
      });

      User.createUser(newUser, function(err, user){
        if(err) throw err;
        console.log(user);
      });

      req.flash('success', 'You are now registered and can login');

      
      res.redirect('/showAll');
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/');
  
});


module.exports = router;
