/* Code to convert xlsx file to csv */

var xlsx = require('node-xlsx');
var fs = require('fs');
var path = require('path');

var ExcelToCSV = function(filePath, callback){
    var obj = xlsx.parse(filePath); // parses a file
    var fileName = path.basename(filePath, path.extname(filePath));
    var rows = [];
    var writeStr = "";
    
    //looping through all sheets
    for(var i = 0; i < obj.length; i++)
    {
        var sheet = obj[i];
        //loop through all rows in the sheet
        for(var j = 0; j < sheet['data'].length; j++)
        {
                //add the row to the rows array
                rows.push(sheet['data'][j]);
        }
    }
    
    //creates the csv string to write it to a file
    for(var i = 0; i < rows.length; i++)
    {
        console.log(rows[i]);
        writeStr += rows[i].join(",") + "\n";
    }
    
   var dstFileName = "./upload/" + fileName + ".csv";
    fs.writeFile(dstFileName, writeStr, function(err) {
        if(err) {
            return console.log(err);
        }
        callback(dstFileName);
    });

};


module.exports = ExcelToCSV;