'use strict';

peercentileApp.controller('adminController', ['$scope', '$location', 'authentication', 'fileUpload',
function($scope, $location, authentication, fileUpload){

    $scope.userInfo = authentication.getUserInfo();


    $scope.uploadFile = function(){
        if($scope.teachersLoginFilePath){
            fileUpload.upload($scope.teachersLoginFilePath).then(function(data){
                if(data.status == 200){
                    console.log("File Uploaded successfully");
                }
            });
        }
        else{
            console.log("Select a file to upload");
        }
        
       
    };
}])
