var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var methodOverride = require("method-override");
var upload = multer({ dest: 'astart/public/img/avatars/' });
var cloudinary = require("cloudinary");
var dotenv = require("dotenv");
var Resource = require('../models.resources.js');

router.get("/resources", ensureAuthenticated, function(req, res) {
    User.findById(req.params.id, function(err, userRef) {
        if (err) {
          console.log(err);
        }  else {
            res.render('resources',  {userRef: userRef, user: req.user,});
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