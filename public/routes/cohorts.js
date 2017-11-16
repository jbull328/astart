var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/user.js');
var multer = require('multer');
var upload = multer({ dest: 'public/img/avatars' });
var Project = require("../models/userProjects.js");
var Blog = require('../models/userBlogs.js');
var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cloudinary = require("cloudinary");
var multer = require("multer");
var dotenv = require("dotenv");
var Cohorts = require("../models/cohorts.js");

router.get('/info/', function(req, res) {
    res.render('cohorts');
});

router.get('/cohortSignup/', function(req, res) {
    res.render('cohortSignup');
});


router.post('/cohortSignup/', function(req, res) {
    var cohortUserName = req.body.name;
    var cohortUserEmail = req.body.email;
    var level = req.body.level;
    // var commit = req.file.commit;
    var availability = req.file.availability;
    var NewCohorter = { cohortUserName, cohortUserEmail, level, availability,};
    Cohorts.create(NewCohorter, function(err, cohorter) {
        if (err) {
            console.log(err);
            res.render('cohorts');
        } else {
            console.log(cohorter) 
            res.redirect('/info/');
        }
    });
});
module.exports = router;