'use strict';

peercentileApp.service('fileUpload', ['$http', 
        function($http){
            this.upload = function(file, userInfo){
                if(file){
                    var formData = new FormData();
                    formData.append('file', file);
                    formData.append("userInfo", angular.toJson(userInfo));

                    return $http.post('/api/upload', formData,{
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                     }).then(
                        function(data){
                            return data;
                        }, function(errResponse){
                            return errResponse;
                        });
                 }
                
                
            }

        }]);