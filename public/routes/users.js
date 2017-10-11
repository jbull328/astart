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
var upload = multer({ dest: 'public/img/avatars' });
// methodOverride = require("method-override"),
// expressSanitizer = require("express-sanitizer");

var User = require('../models/user.js');

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
  var avatar = req.file.path;
  cloudinary.uploader.upload(avatar, function(result) {
  var imageRef = result.url;
  });


  // Form Validator
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('username','Username field is required').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
  	res.render('register', {
  		errors: errors
  	});
  } else{
  	var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });

    req.flash('success', 'You are now registered and can login');

    res.location('/');
    res.redirect('/showAll');
  }
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/');
});

router.get('/details/:id', ensureAuthenticated, function(req, res) {
  User.findById(req.params.id, function(err, userRef) {
    if (err) {
      console.log(err);
    }  else {
      res.render('userDetails', {userRef: userRef, user: req.user,});
    }
  });
});

router.post("/details/:id", ensureAuthenticated, function(req, res) {
  // req.body.customer.body = req.sanitize(req.customer.customer.body);
  var currentOccupation = req.body.currentOccupation;
  var description = req.body.description;
  var avatar = req.file.path;
  cloudinary.uploader.upload(avatar, function(result) {
  var imageRef = result.url;

  User.findByIdAndUpdate(req.params.id, req.body.userRef, function(err, userRef) {
    var id = req.params.id;
    if (err) {
      console.log(err);
      res.redirect("/users/showUser/" + id);
    } else {
      console.log(userRef);
      res.redirect("/users/showUser/" + id);
    }
  });
 });
});

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
            if (req.user) {
              console.log(req.user)
              res.render("showUser", {userRef: userRef, projects: projects, blogs: blogs, user: req.user,});
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
