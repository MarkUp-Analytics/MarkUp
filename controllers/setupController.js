var user = require('../models/users');
var school = require('../models/school');
var crypto = require('crypto');
//var loggedInUserDetails = require('./loggedInUserDetails');

module.exports = function (app) {

    app.post('/api/createUser', function (request, response) {
        user.findOne({
            $and: [
                { username: request.body.username },
                { schoolID: request.body.schoolID },
                { recordStatusFlag: 'Active'}
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
                newUser.recordStatusFlag = "Active";
                newUser.recordCreatedDate = new Date();
                newUser.recordLastModified = new Date();

                user.create(newUser, function (err, result) {
                    if (err) {
                        response.status(400).json({msg: "error creating user"});
                    }
                    response.send(result);
                });
            }
        });

    });


    app.post('/api/login', function (request, response) {
        user.findOne({//Query matches for both username and school ID
            $and: [
                { username: request.body.username },
                { schoolID: request.body.school._id },
                {recordStatusFlag: 'Active'}
            ]
        }).select('-recordCreatedDate -recordLastModified -recordStatusFlag -__v').exec(function (err, user) {
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
                var requiredInfo = {};
                requiredInfo.username = user.username;
                requiredInfo.firstName = user.firstName;
                requiredInfo.lastName = user.lastName;
                requiredInfo.schoolID = user.schoolID;
                requiredInfo.role = user.role;
                requiredInfo._id = user._id;
                response.send(requiredInfo);
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