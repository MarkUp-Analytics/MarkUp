'use strict';

peercentileApp.controller('teacherController', ['$scope', '$location', 'authentication', 'applicationMessages', 'customDialog', 'teacherService',
    function ($scope, $location, authentication, applicationMessages, customDialog, teacherService) {
        
        $scope.userInfo = authentication.getUserInfo();
        $scope.applicationMessages = applicationMessages;

        var teacherDetails = {};
        teacherDetails.firstName = $scope.userInfo.firstName;
        teacherDetails.lastName = $scope.userInfo.lastName;
        teacherDetails.userID = $scope.userInfo._id;

        teacherService.getTeacherInfo(teacherDetails).then(function(teacherInfo){
            $scope.teacherDetails = teacherInfo;
            teacherService.getMyClassWithSubjects($scope.teacherDetails.schoolID, $scope.teacherDetails._id).then(function (result) { //Get all classes and subjects that the current logged in teacher teaches.
                $scope.classWithSubjectList = result;
                console.log(result);
            });
        },function(err){
            console.log(err);
        })

        
      
    }])
