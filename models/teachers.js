var mongoose = require('mongoose');

var schema = mongoose.Schema;

var teacherSchema = new schema({
    firstName: String,
    lastName: String,
    DOB: String,
    userID: {type: schema.Types.ObjectId, ref: 'user'},
    schoolID: {type: schema.Types.ObjectId, ref: 'school'},
    recordStatusFlag: String,
    recordCreatedDate: Date,
    recordLastModified: Date
},{ collection : 'Teachers' });

var teacher = mongoose.model('teacher', teacherSchema);

module.exports = teacher;