var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user.js');
var Resources = require('../models/resources.js');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var methodOverride = require("method-override");
var upload = multer({ dest: 'astart/public/img/avatars/' });
var cloudinary = require("cloudinary");
var dotenv = require("dotenv");



router.get("/resources", ensureAuthenticated, function(req, res) {
    Resources.find({}, function(err, resources) {
        if (err) {
          console.log(err);
        }  else {
            console.log(resources);
            res.render('resources',  {resources: resources,});
        }
    });  

});

router.get('/resourcesCreate', ensureAuthenticated, function(req, res) {
    res.render('resourceCreate');
});

router.post('/resourcesCreate', function(req, res) {
   var resourceTitle = req.body.resourceTitle;
   var resourceImage = "./img/examples/catdude.jpg";
   var resourceDescription = req.body.resourceDescription;
   var resourceUrl = req.body.resourceUrl;
   var complete = false;
   var newResource = {resourceTitle: resourceTitle, resourceImage: resourceImage, resourceDescription: resourceDescription, resourceUrl: resourceUrl, complete: complete,};
    console.log(newResource);
   Resources.create(newResource, function(err, resources) {
       if (err) {
           console.log(err); 
       } else {
           console.log(resources);
           res.redirect('resources');
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