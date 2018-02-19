var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));

// parse application/json
app.use(bodyParser.json({limit: '50mb'}));

var config = require('./config');
var mongoose = require('mongoose');

var setUpController = require('./controllers/setupController');
var fileUploadController = require('./controllers/fileUploadController');

var port = process.env.port || 3000;

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDBConnectionString());
setUpController(app);
fileUploadController(app);

app.listen(port);
