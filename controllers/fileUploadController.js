var multer = require('multer');
var path = require('path');

var readCSV = require('./readCSVFileController');
var convertToCSV = require('./convertExcelToCSV');


module.exports = function(app){
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, './upload')
        },
        filename: function(req, file, callback) {
            var uploadedFileName = path.basename(file.originalname, path.extname(file.originalname));
            callback(null, uploadedFileName + '-' + Date.now() + path.extname(file.originalname));
        }
    });
    var upload = multer({
		storage: storage
    }).single('file');
    
    var fileIsReadyToBeProcessed = function(file, callback){
        
        var fileType = file.mimetype.toString().toLowerCase();
        var fileExt = file.originalname.split('.').pop().toLowerCase();
        var result = {};

        if(fileType != 'application/vnd.ms-excel' && fileType != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
            result.status = "failure";
            result.msg =  "Please upload xlsx/csv file. The uploaded file is not processed!";
            callback(result);
        }
        else if(fileType == "application/vnd.ms-excel" &&  fileExt == "csv"){ 
            readCSV.validateCSV(file.path, "student", function(result){// To validate csv file. It checks for the number of columns matches the pre defined array of columns
                if(result.status == "failure"){
                    callback(result);
                }

                else if(result.status == "success"){
                    result.filePath = file.path;
                    callback(result);
                }
            });
            
        }

        else if(fileType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&  fileExt == "xlsx"){// Converting XLSX file into CSV and then validating the file
            convertToCSV(file.path, function(csvFile){
                readCSV.validateCSV(csvFile, "student", function(result){
                    if(result.status == "failure"){
                        callback(result);
                    }
    
                    else if(result.status == "success"){
                        result.filePath = csvFile;
                        callback(result);
                    }
                });
            })
        }

    };
    
    
    app.post('/api/upload', upload, function (req, res, next) {
        var fileReport = {};
        if(req.file){
            fileIsReadyToBeProcessed(req.file, function(fileReport){
                if(!req.body.userInfo){
                    res.status(400).json({msg:"Unable to access user info"});
                }
                if(fileReport.status == "success"){
                    var loggedInUserInfo = JSON.parse(req.body.userInfo);

                    // createUserLogin(fileReport.filePath, function(){// If the csv file is validated and has no error, we can create user login.

                    // });
                    //readCSV(req.file.path);
                    res.send("Success");
                }
    
                else{
                    res.status(400).json({msg: fileReport.msg});
    
                }
            });
            

            
        }
        else{
            res.status(400).json({msg: "Fail"});
        }
      });

}
