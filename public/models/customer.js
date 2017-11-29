var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/customer');

var db = mongoose.connection;

var customer = new mongoose.Schema({
  customerName: String,
  companyName: String,
  customerEmail: String,
  phone: String,
  converted: Boolean,
});
var Customer  = module.exports = mongoose.model('Customer', customer);
