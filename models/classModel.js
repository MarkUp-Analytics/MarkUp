var mongoose = require('mongoose');

var schema = mongoose.Schema;

var classSchema = new schema({
    class: String
    , section: String
    , batchYear: String
    , schoolID: {type: schema.Types.ObjectId, ref: 'school'}
    , recordStatusFlag: String
    , recordCreatedDate: Date
    , recordLastModified: Date
}, { collection : 'Classes' });


var classModel = mongoose.model('classModel', classSchema);

module.exports = classModel;