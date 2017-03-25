var mongoose = require('mongoose');

var userProjects = new mongoose.Schema({
  projTitle: String,
  projDescription: String,
  projImageRef: String,
  projLink: String,
  // projLikes: [
  //   {
  //
  //   }
  // ] ,
  // projComments: [
  //   {
  //
  //   }
  // ]
});
var Project = mongoose.model("Project", userProjects);

module.exports = mongoose.model("Project", userProjects);
