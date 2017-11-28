var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/resources');

var db = mongoose.connection;

var resource = mongoose.Schema({
  resourceTitle: String,
  resourceImage: String,
  resourceDescription: String,
  resourceUrl: String,
  complete: Boolean,
});
var Resource = mongoose.model('Resource', resource);

module.exports = mongoose.model('Resource', resource);
