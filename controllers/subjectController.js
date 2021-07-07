var subject = require('../models/subjects');

module.exports = function (app) {
    app.post('/api/createSubject', function (request, response) { //API to create new school. This is available only to user with Manager role. (only Markup employees)
        
        subject.findOne({ //Two subjects with same name and board cannot exist.
            $and: [
                { subjectName: request.body.subjectName },
                { board: request.body.board },
                {recordStatusFlag: 'Active'}
            ]
        }).exec(function (err, subjectFromDB) {
            if (err) { throw err; }

            else if (subjectFromDB) {
                response.status(400).json({msg: "subject name exists"});
            }

            else {           // If there are no subject found in DB then create a subject
                var newSubject = {};
                newSubject.subjectName = request.body.subjectName;
                newSubject.board = request.body.board;
                newSubject.recordStatusFlag = "Active";
                newSubject.recordCreatedDate = new Date();
                newSubject.recordLastModified = new Date();

                subject.create(newSubject, function (err, result) {
                    if (err) {
                        response.status(400).json({msg: "error creating subject"});
                    }
                    response.send(result);
                });
            }
        });

    });

    app.get('/api/getSubjectList', function(request, response){
        subject.find({
            $and: [
                { board: request.query.boardName },
                {recordStatusFlag: 'Active'}
            ]
        }).select('-recordCreatedDate -recordLastModified -recordStatusFlag -__v').exec(function (err, subjectsFromDB) {
            if (err) { throw err; }

            else {
                response.send(subjectsFromDB);
            }
        });
    });

}
