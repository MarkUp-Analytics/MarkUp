var teacher = require('../models/teachers');

module.exports = function (app) {
    app.post('/api/getTeacherInfo', function (request, response) { 
        
        teacher.findOne({ //To find student who has logged in.
            $and: [
                { firstName: request.body.firstName },
                { lastName: request.body.lastName },
                { userID: request.body.userID },
                { recordStatusFlag: 'Active' }
            ]
        }).select('-recordCreatedDate -recordLastModified -recordStatusFlag -__v').populate({
            path: 'userID',
            select: '-recordCreatedDate -recordLastModified -recordStatusFlag -__v',
            populate: {
                 path: 'schoolID',
                 select: '-recordCreatedDate -recordLastModified -recordStatusFlag -_id -__v'
                 }
        }).exec(function (err, teacherFromDB) {
            if (err) { throw err; }

            else if (teacherFromDB) {
                response.send(teacherFromDB);
            }

            else{
                response.status(400).json({msg: "Unable to find Teacher details!"});
            }
        });

    });

    app.post('/api/getAllTeachers', function(request, response){
        teacher.find({
            recordStatusFlag: 'Active',
            schoolID: request.body.schoolID
        }).select('-recordCreatedDate -recordLastModified -recordStatusFlag -__v').populate({// select clause will help us to filter records. Populate will create nested objects based on other schema ID stored as property.
            path: 'schoolID  userID',
            select: '-salt -hash -recordCreatedDate -recordLastModified -recordStatusFlag -__v',
            
        }).exec(function (err, teachersFromDB) {
            if (err) { throw err; }

            else if (teachersFromDB) {
                response.send(teachersFromDB);
            }

            else{
                response.send({msg: "No teachers found!"});
            }
        });
    });
}
