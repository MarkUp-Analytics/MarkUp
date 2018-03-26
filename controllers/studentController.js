var student = require('../models/students');

module.exports = function (app) {
    app.post('/api/getStudentInfo', function (request, response) { // API to get logged in student details.
        
        student.findOne({ //To get the student profile of the logged in user.
            $and: [
                { firstName: request.body.firstName },
                { lastName: request.body.lastName },
                { userID: request.body.userID },
                { recordStatusFlag: 'Active' }
            ]
        }).select('-userID -recordCreatedDate -recordLastModified -recordStatusFlag -__v').populate({// select clause will help us to filter records. Populate will create nested objects based on other schema ID stored as property.
            path: 'classID',
            select: '-recordCreatedDate -recordLastModified -recordStatusFlag -__v',
            populate: {
                 path: 'schoolID',
                 select: '-recordCreatedDate -recordLastModified -recordStatusFlag -_id -__v'
                 }
        }).exec(function (err, studentFromDB) {
            if (err) { throw err; }

            else if (studentFromDB) {
                response.send(studentFromDB);
            }

            else{
                response.status(400).json({msg: "Unable to find student details!"});
            }
        });

    });

    app.post('/api/getAllStudents', function(request, response){
        student.find({
            recordStatusFlag: 'Active',
            schoolID: request.body.schoolID
        }).select('-recordCreatedDate -recordLastModified -recordStatusFlag -__v').populate({// select clause will help us to filter records. Populate will create nested objects based on other schema ID stored as property.
            path: 'classID schoolID  userID',
            select: '-salt -hash -recordCreatedDate -recordLastModified -recordStatusFlag -__v',
            
        }).exec(function (err, studentsFromDB) {
            if (err) { throw err; }

            else if (studentsFromDB) {
                response.send(studentsFromDB);
            }

            else{
                response.send({msg: "No students found!"});
            }
        });
    });
}
