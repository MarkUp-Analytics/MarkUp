'use strict';

peercentileApp.service('fileUpload', ['$http', 
        function($http){
            this.upload = function(file){
                if(file){
                    var formData = new FormData();
                    formData.append('file', file);
    
                    return $http.post('/api/upload', formData,{
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                     }).then(
                        function(data){
                            return data;
                        });
                }
                
                
            }
        }]);