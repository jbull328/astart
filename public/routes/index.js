var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});

// function ensureAuthenticated(req, res, next) {
//   if(req.isAuthenticated()){
//     return next();
//   }
//   res.redirect('/user/login');
// }

module.exports = router;
