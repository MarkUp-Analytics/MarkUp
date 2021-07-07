var mongoose = require('mongoose');

var schema = mongoose.Schema;

var subjectSchema = new schema({
    subjectName: String
    , board: String
    , recordStatusFlag: String
    , recordCreatedDate: Date
    , recordLastModified: Date
}, { collection : 'Subjects' });


var subject = mongoose.model('subject', subjectSchema);

module.exports = subject;