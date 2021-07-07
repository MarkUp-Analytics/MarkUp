var mongoose = require('mongoose');

var schema = mongoose.Schema;

var studentSchema = new schema({
    firstName: String,
    lastName: String,
    DOB: String,
    userID: {type: schema.Types.ObjectId, ref: 'user'},
    classID: {type: schema.Types.ObjectId, ref: 'classModel'},
    schoolID: {type: schema.Types.ObjectId, ref: 'school'},
    recordStatusFlag: String,
    recordCreatedDate: Date,
    recordLastModified: Date
},{ collection : 'Students' });

var student = mongoose.model('student', studentSchema);

module.exports = student;