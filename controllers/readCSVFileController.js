var csv = require('fast-csv');
var parseStudent = require('./createStudentController');

module.exports = function(filePath){
    csv.fromPath(filePath, 
        {   headers:true, 
            ignoreEmpty:true,
        })
            .on("data", function(data){
                parseStudent(data);
                console.log(data);
            })
            .on("end", function(){
                console.log("done");
            });

};