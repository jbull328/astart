var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Project = require("../models/userProjects.js");
var Blog = require('../models/userBlogs.js');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var methodOverride = require("method-override");
var upload = multer({ dest: 'astart/public/img/avatars/' });
var cloudinary = require("cloudinary");
var dotenv = require("dotenv");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});


router.get("/showAll/", function(req, res) {
  User.find(function(err, userRef) {
    if (err) {
      console.log(err);
    } else {
      res.render("showAll", {userRef: userRef, user: req.user,});
    }
  });

});;




function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/users/login');
}


module.exports = router;
