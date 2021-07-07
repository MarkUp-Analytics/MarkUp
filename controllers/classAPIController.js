var classModel = require('../models/classModel');

module.exports = function (app) {
    app.post('/api/saveSubjectLink', function (request, response) { //API to save subject and teachers inside class.
        
        classModel.findOne({
            $and: [
                { _id: request.body.classID },
                {recordStatusFlag: 'Active'}
            ]
        }).exec(function (err, classFromDB) {
            if (err) { throw err; }

            else if (!classFromDB) {
                response.status(400).json({msg: "Unable to find class."});
            }

            else {           // Save the subjects object which has the subjectID and teachers array.
                classFromDB.subjects = request.body.subjects;
                classFromDB.recordLastModified = new Date();

                classFromDB.save(function (err, result) {
                    if (err) {
                        response.status(400).json({msg: "unable to link subject and teacher"});
                    }
                    response.send(result);
                });
            }
        });

    });

    app.get('/api/getClassList', function(request, response){
        classModel.find({
            $and: [
                { schoolID: request.query.schoolID},
                { batchYear: request.query.batch },
                {recordStatusFlag: 'Active'}
            ]
        }).select('-recordCreatedDate -recordLastModified -recordStatusFlag -__v').exec(function (err, classesFromDB) {
            if (err) { throw err; }

            else {
                response.send(classesFromDB);
            }
        });
    });

}
