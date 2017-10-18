var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var multer = require('multer');
var cloudinary = require("cloudinary");
var path = require('path');
var upload = multer({ dest: './img/avatars' });


mongoose.connect('mongodb://localhost/users');

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
    username: {
      type: String,
      index: true
    },
    password: {
      type: String
    },
    email: {
      type: String
    },
    name: {
      type: String
    },
    profileimage: {
      type: String
    },
    currentOccupation: String,
    description: String,
    userEmail: String,
    imageRef: String,
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ],
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
      }
    ]
});


var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      callback(null, isMatch);
  });
}

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
    });
  });
};


module.exports.uploadAvatar = function(imageRef, callback) {
  var avatar = req.file.path;
  cloudinary.uploader.upload(avatar, function(result) {
  var imageRef = result.url;
  });
};