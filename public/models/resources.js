var mongodb = require('mongodb');
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/resources');

var db = mongoose.connection;

var resources = new mongoose.Schema({
  resourceTitle: String,
  resourceImage: String,
  resourceDescription: String,
  resourceUrl: String,
  complete: Boolean,
});
var Resources = mongoose.model('Resources', resources);

module.exports = mongoose.model('Resources', resources);
