var mongoose = require("mongoose");

var userBlogs = new mongoose.Schema({
  blogTitle: String,
  blogImage: String,
  blogbody: String,
});
var Blog = mongoose.model("Blog", userBlogs);

module.exports = mongoose.model("Blog", userBlogs);
