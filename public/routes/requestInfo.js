var express = require("express"),
router = express.Router(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
Project = require("../models/userProjects.js"),
FccUsers = require("../models/fccUsers.js"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer");

router.use(function(req, res, next) {
  next()
});

router.get('/requestInfo', function(req, res) {
    res.render('requestInfo')

});

module.exports = router;