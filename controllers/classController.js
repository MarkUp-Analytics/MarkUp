var classModel = require('../models/classModel');

var Promise = require('bluebird');

var classCtrl = {};

classCtrl.getClassID = function(classObj, schoolID, batchYear){

    return new Promise(function(resolve, reject){
        classModel.findOne({ //Two schools with same name, board and pincode cannot exist. There can be 2 Mahatma school which are state board but they have to be in different cities/pincode.
            $and: [
                { class: classObj.class },
                { section: classObj.section },
                { batchYear: batchYear },
                { schoolID: schoolID },
                { recordStatusFlag: 'Active' }
            ]
        }).exec(function (err, classFromDB) {
            if (err) { reject(err); }
    
            else if (classFromDB) {
                resolve(classFromDB.id);
            }
    
            else {           // If there are no class found in DB then create a new class and section
                var newClass = {};
                newClass.class = classObj.class;
                newClass.section = classObj.section;
                newClass.schoolID = schoolID;
                newClass.batchYear = batchYear;
                newClass.recordStatusFlag = "Active";
                newClass.recordCreatedDate = new Date();
                newClass.recordLastModified = new Date();
    
                classModel.create(newClass, function (err, result) {
                    if (err) {
                        reject({status:"failure", msg: "error creating Class"});
                    }
                    resolve(result.id);
                });
            }
        });
    });

    

};

module.exports = classCtrl;