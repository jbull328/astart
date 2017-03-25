var mongoose = require('mongoose');

var modestoFCCUsers = new mongoose.Schema({
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

module.exports = mongoose.model("FCCUsers", modestoFCCUsers);
