var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});


router.get("/showAll/", function(req, res) {
  User.find(function(err, userRef) {
    if (err) {
      console.log(err);
    } else {
      console.log(userRef);
      res.render("showAll", {userRef: userRef,});
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
