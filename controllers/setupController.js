var user = require('../models/users');
var school = require('../models/school');
var crypto = require('crypto');
var loggedInUserDetails = require('./loggedInUserDetails');

module.exports = function (app) {

    app.post('/api/createUser', function (request, response) {
        user.findOne({
            $and: [
                { username: request.body.username },
                { schoolID: request.body.schoolID }
            ]
        }).exec(function (err, userFromDB) {
            if (err) { throw err; }

            else if (userFromDB) {
                response.status(400).json({msg: "user exists"});
            }

            else {           // If there are no users found in DB then create an account
                var newUser = {};
                newUser.username = request.body.username;
                newUser.firstName = request.body.firstName;
                newUser.lastName = request.body.lastName;
                newUser.schoolID = request.body.schoolID;
                newUser.role = request.body.role;
                newUser.salt = crypto.randomBytes(16).toString('hex');
                newUser.hash = crypto.pbkdf2Sync(request.body.pwd, newUser.salt, 1000, 64, 'sha512').toString('hex');

                user.create(newUser, function (err, result) {
                    if (err) {
                        response.status(400).json({msg: "error creating user"});
                    }
                    response.send(result);
                });
            }
        });

    });

    // app.post('/api/createSchool', function (request, response) { //API to create new school. This is available only to user with Manager role. (only Markup employees)
        
    //     school.findOne({ //Two schools with same name, board and pincode cannot exist. There can be 2 Mahatma school which are state board but they have to be in different cities/pincode.
    //         $and: [
    //             { schoolName: request.body.schoolName },
    //             { board: request.body.board },
    //             {pincode: request.body.pincode}
    //         ]
    //     }).exec(function (err, school) {
    //         if (err) { throw err; }

    //         else if (school) {
    //             response.status(400).json({msg: "school name exists"});
    //         }

    //         else {           // If there are no school found in DB then create an account
    //             var newSchool = {};
    //             newSchool.schoolName = request.body.schoolName;
    //             newSchool.address1 = request.body.address1;
    //             newSchool.address2 = request.body.address2;
    //             newSchool.city = request.body.city;
    //             newSchool.state = request.body.state;
    //             newSchool.pincode = request.body.pincode;
    //             newSchool.board = request.body.board;

    //             school.create(newSchool, function (err, result) {
    //                 if (err) {
    //                     response.status(400).json({msg: "error creating school"});
    //                 }
    //                 response.send(result);
    //             });
    //         }
    //     });

    // });

    app.post('/api/login', function (request, response) {
        user.findOne({//Query matches for both username and school ID
            $and: [
                { username: request.body.username },
                { schoolID: request.body.school._id }
            ]
        }).exec(function (err, user) {
            if (err) { throw err; }
            // Return if user not found in database
            else if (!user) {
                response.status(400).json("User not found in DB");
            }

            else if (!user.validPassword(request.body.pwd)) {
                response.status(400).json("Invalid password");
            }
            // If credentials are correct, return the user object
            else {
                loggedInUserDetails.saveUserInfo(user, function(savedUser){ // To save the logged in user details for server purpose.
                    response.send(user);
                });
            }
        });

    });

    app.delete('/api/removeUser', function (request, response) {
        user.findOneAndRemove({ username: request.body.username }, function (err) {
            if (err) {
                throw err;
            }
            else {
                response.status(200).json("Successfully removed user");
            }
        })
    })
}