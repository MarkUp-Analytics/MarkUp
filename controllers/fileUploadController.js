var multer = require('multer');
var path = require('path');

var readCSV = require('./readCSVFileController');


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
        if(fileType == "application/vnd.ms-excel" &&  fileExt == "csv"){ // To validate csv file. It checks for the number of columns matches the pre defined array of columns
            readCSV.validateCSV(file.path, "student", function(result){
                console.log("validate CSV: " + result);
                if(result.status == "failure"){
                    callback(result);
                }

                else if(result.status == "success"){
                    callback(result);
                }
            });
            
        }

    };
    
    
    app.post('/api/upload', upload, function (req, res, next) {
        var fileReport = {};
        if(req.file){
            fileIsReadyToBeProcessed(req.file, function(fileReport){
                if(fileReport.status == "success"){
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
