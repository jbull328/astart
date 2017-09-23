var mongoose = require('mongoose');

var customer = new mongoose.Schema({
    customerfName: String,
    customerlName: String,
    companyName: String,
    projectDescription: String,
    projectType: String,
    customerEmail: String,
    phone: String,
    converted: Boolean,
});
var Customer = mongoose.model("Customer", customer);

module.exports = mongoose.model("Customer", customer);