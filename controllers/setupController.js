var user = require('../models/users');
var crypto = require('crypto');

module.exports = function (app) {

    app.post('/api/createUser', function (request, response) {
        user.findOne({
            $and: [
                { username: request.body.username },
                { schoolName: request.body.schoolName }
            ]
        }).exec(function (err, user) {
            if (err) { throw err; }

            else if (user) {
                response.status(400).json({msg: "user exists"});
            }

            else {           // If there are no users found in DB then create an account
                var newUser = {};
                newUser.username = request.body.username;
                newUser.firstName = request.body.firstName;
                newUser.lastName = request.body.lastName;
                newUser.schoolName = request.body.schoolName;
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

    app.post('/api/login', function (request, response) {
        user.findOne({
            $and: [
                { username: request.body.username },
                { schoolName: request.body.schoolName }
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
                response.send(user);
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