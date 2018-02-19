var crypto = require('crypto');
var mongoose = require('mongoose');
var db = mongoose.connection;

var schema = mongoose.Schema;

var userSchema = new schema({
    username: String,
    firstName: String,
    lastName: String,
    schoolName: String,
    salt: String,
    hash: String,
    role: String
}, { collection : 'Users' });

userSchema.methods.setPassword = function(password){ //Encrypting the pwd before sending it to MongoD
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };
    
  userSchema.methods.validPassword = function(password) { //Checking for pwd match
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };


var user = mongoose.model('user', userSchema);

module.exports = user;