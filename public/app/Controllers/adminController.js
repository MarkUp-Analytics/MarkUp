'use strict';

peercentileApp.controller('adminController', ['$scope', '$location', 'authentication', 'fileUpload', 'applicationMessages', 'customDialog',
    function ($scope, $location, authentication, fileUpload, applicationMessages, customDialog) {

        $scope.userInfo = authentication.getUserInfo();
        $scope.applicationMessages = applicationMessages;
        $scope.noFileFound = false;
        $scope.wrongFileExtension = false;

        $scope.uploadFile = function () {
            $scope.noFileFound = false;
            $scope.wrongFileExtension = false;

            if (!$scope.filePath) {
                customDialog.errorDialog(applicationMessages.getMessage('noFileFound'));
                return;
            }
            var fileType = $scope.filePath.type;
            if (fileType != 'application/vnd.ms-excel' && fileType != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') { //Only CSV and xlsx file format are accepted
                customDialog.errorDialog(applicationMessages.getMessage('wrongFileExtension'));
                return;
            }

            fileUpload.upload($scope.filePath, $scope.userInfo).then(function (data) {
                if (data.status == 200) {
                    console.log("File Uploaded successfully");
                }
            }, function(errResponse){
                customDialog.errorDialog(errResponse.data.msg);
            });


        };
    }])
