'use strict';

peercentileApp.controller('teacherController', ['$scope', '$location', 'authentication', 'applicationMessages', 'customDialog',
    function ($scope, $location, authentication, applicationMessages, customDialog) {
        
        $scope.userInfo = authentication.getUserInfo();
        $scope.applicationMessages = applicationMessages;
      
    }])
