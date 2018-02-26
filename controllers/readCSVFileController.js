var csv = require('fast-csv');
var parseStudent = require('./createStudentController');
var csvProcess = {};

csvProcess.validateCSV = function(filePath, role, callback){
    var result = {};
    var line = 0;
    var expectedHeaders = []; //Pre defined headers that we expect in csv file. All schools MUST FOLLOW this order.
    if(role == "student"){
        expectedHeaders = ["rollNo", "firstName", "lastName", "class", "section", "DOB"]; //Student csv file
    }
    else{
        expectedHeaders = ["teacherID", "firstName", "lastName", "subject", "DOB"]; //teacher csv file
    }

    csv.fromPath(filePath)
    .on("data", function(data){
        
        
        if(line == 0){ //Read only the first row which has the column names.
            var headersArr = data;
            if(headersArr.length != expectedHeaders.length){
                result.status = "failure";
                result.msg =  "Number of columns did not match!";
            }

            else if(JSON.stringify(headersArr) !== JSON.stringify(expectedHeaders)){
                result.status = "failure";
                result.msg =  "Column names are not in the right order!";
            }

            else{
                result.status = "success";
                result.msg = "success";
            }

            

        }

        
        line++;
    })
    .on("end", function(){
        callback(result);
    });
};

var tmp = function(filePath){
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

module.exports = csvProcess;