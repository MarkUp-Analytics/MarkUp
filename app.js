var bodyParser = require('body-parser');
var express = require('express');
var app = express();

//script path for installed dependencies. This is to make sure the server folder structure is not exposed to outside world. Explanation: https://stackoverflow.com/a/27464258/2079271

// app.use('/ngDialog', express.static(__dirname + '/node_modules//ng-dialog/')); //Using cdn instead of dependency

app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));

// parse application/json
app.use(bodyParser.json({limit: '50mb'}));

var config = require('./config');
var mongoose = require('mongoose');

var setUpController = require('./controllers/setupController');
var schoolController = require('./controllers/schoolController');
var teacherController = require('./controllers/teacherController');
var studentController = require('./controllers/studentController');
var subjectController = require('./controllers/subjectController');
var fileUploadController = require('./controllers/fileUploadController');
var classAPIController = require('./controllers/classAPIController');

var port = process.env.port || 3000;

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDBConnectionString());
setUpController(app);
schoolController(app);
fileUploadController(app);
teacherController(app);
studentController(app);
subjectController(app);
classAPIController(app);

app.listen(port);
