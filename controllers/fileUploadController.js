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
	}).single('file')
    
    
    app.post('/api/upload', upload, function (req, res, next) {
        if(req.file){
            readCSV(req.file.path);
            console.log(req.file);
            res.send("Success");
        }
        else{
            res.send("Fail");
        }
      });

}
