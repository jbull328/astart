var mongoose = require('mongoose');

var modestoFCCUsers = new mongoose.Schema({
    username: String,
    fName: String,
    lName: String,
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
var FccUsers = mongoose.model("FccUsers", modestoFCCUsers);

module.exports = mongoose.model("FccUsers", modestoFCCUsers);
