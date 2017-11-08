var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/customer');

var db = mongoose.connection;

var customer = mongoose.Schema({
  blogTitle: String,
  blogImage: String,
  blogbody: String,
});
var Customer  = module.exports = mongoose.model('Customer', customer);
