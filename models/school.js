var mongoose = require('mongoose');

var schema = mongoose.Schema;

var schoolSchema = new schema({
    schoolName: String
    , addressLine1: String
    , addressLine2: String
    , city:String
    , state:String
    , pincode:String
    , board: String
}, { collection : 'Schools' });


var school = mongoose.model('school', schoolSchema);

module.exports = school;