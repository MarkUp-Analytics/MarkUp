'use strict';

peercentileApp.controller('adminController', ['$scope','$location', 'authentication', 'fileUpload', 'applicationMessages', 'customDialog', 
    function ($scope, $location, authentication, fileUpload, applicationMessages, customDialog) {

        $scope.userInfo = authentication.getUserInfo();
        $scope.applicationMessages = applicationMessages;
        $scope.noFileFound = false;
        $scope.wrongFileExtension = false;
        $scope.today = new Date();
        $scope.yearArr = [];
        for(var i=0; i<5; i++){
            $scope.yearArr.push(($scope.today.getFullYear() + i).toString());
        }

        $scope.uploadFile = function (role) {
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
            var loadingDialog = customDialog.loadingDialog();
            fileUpload.upload($scope.filePath, $scope.userInfo, role, $scope.batch).then(function (data) {

                if (data.status == 200) {
                    customDialog.successDialog(applicationMessages.getMessage('fileUploaded') + "\n" + data.data.msg);
                }

                else{
                    customDialog.errorDialog(data.data.msg);
                }
            }, function(errResponse){
                customDialog.errorDialog(errResponse.data.msg);
            }).finally(function(){
                loadingDialog.close();
            });


        };
    }])
