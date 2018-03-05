var school = require('../models/school');

module.exports = function (app) {
    app.post('/api/createSchool', function (request, response) { //API to create new school. This is available only to user with Manager role. (only Markup employees)
        
        school.findOne({ //Two schools with same name, board and pincode cannot exist. There can be 2 Mahatma school which are state board but they have to be in different cities/pincode.
            $and: [
                { schoolName: request.body.schoolName },
                { board: request.body.board },
                {pincode: request.body.pincode}
            ]
        }).exec(function (err, schoolFromDB) {
            if (err) { throw err; }

            else if (schoolFromDB) {
                response.status(400).json({msg: "school name exists"});
            }

            else {           // If there are no school found in DB then create an account
                var newSchool = {};
                newSchool.schoolName = request.body.schoolName;
                newSchool.addressLine1 = request.body.addressLine1;
                newSchool.addressLine2 = request.body.addressLine2;
                newSchool.city = request.body.city;
                newSchool.state = request.body.state;
                newSchool.pincode = request.body.pincode;
                newSchool.board = request.body.board;

                school.create(newSchool, function (err, result) {
                    if (err) {
                        response.status(400).json({msg: "error creating school"});
                    }
                    response.send(result);
                });
            }
        });

    });

    app.get('/api/getSchoolList', function(request, response){
        school.find({}, function(err, schools){
            if(err){
                throw err;
            }
            else{
                response.send(schools);
            }
        })
    });

    app.get('/api/deleteAllSchools', function(response, request){
        school.remove({}, function(err, data){
            return response.data;
        });
    });
}
