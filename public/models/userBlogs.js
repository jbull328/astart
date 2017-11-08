var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/userBolgs');

var db = mongoose.connection;

var userBlogs = mongoose.Schema({
  blogTitle: String,
  blogImage: String,
  blogbody: String,
});
var Blog = mongoose.model('Blog', userBlogs);

module.exports = mongoose.model('Blog', userBlogs);
