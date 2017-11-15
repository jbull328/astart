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

router.get('/info/', function(req, res) {
    res.render('cohorts');
});

router.get('/cohortSignup/', function(req, res) {
    res.render('cohortSignup');
});

module.exports = router;