var express = require("express"),
router = express.Router(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
Customer = require("../models/customer.js"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer");

router.use(function(req, res, next) {
  next()
});

router.get('/requestInfo', function(req, res) {
    res.render('requestInfo')

});

router.post('/requestInfo/', function(req, res) {
   var customerfName = req.body.customerfName;
   var customerlName = req.body.customerlName;
   var companyName = req.body.companyName;
   var projectDescription = req.body.projectDescription;
//    var projectType = req.body.projectType;
   var customerEmail = req.body.customerEmail;
   var phone = req.body.phone;
   var converted = false;
   var newCustomer =  {customerfName, customerlName, companyName, projectDescription, customerEmail, phone, converted,}
   Customer.create(newCustomer, function(err, customer) {
    if(err) {
        console.log("error creating customer ~~~~~" + err);
      } else {
        console.log("Success " + customerfName + "from " + companyName);
        res.redirect("/");
      }
   });
});

module.exports = router;
