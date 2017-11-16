var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/cohorts');

var db = mongoose.connection;

var cohortUsers = mongoose.Schema({
  name: String,
  email: String,
  availability: String,
  level: String,
  commit: Boolean,
  
});
var Cohorts = mongoose.model('Cohorts', cohortUsers);

module.exports = mongoose.model('Cohorts', cohortUsers);