var crypto = require('crypto');
module.exports = function(studentInfo){
    studentInfo.salt = crypto.randomBytes(16).toString('hex');
    studentInfo.hash = crypto.pbkdf2Sync(studentInfo.pwd, studentInfo.salt, 1000, 64, 'sha512').toString('hex');
};