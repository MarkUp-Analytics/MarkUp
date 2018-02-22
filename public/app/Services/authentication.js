'use strict';

peercentileApp.service('authentication', ['$http', '$localStorage', 
function($http, $localStorage){
    var userInfo = {};
    userInfo.isAuthenticated = false;
    
    this.createUser = function(newUser){ //Method to create a new user. 
        return $http.post('/api/createUser', newUser).then(function(data){
            userInfo = data.data;
            userInfo.isAuthenticated = true;
            $localStorage.userInfo = userInfo;
            return data;
        })
        .catch(function(err){
            return err;
        });
    }
    this.login = function(user){ //Login method
        return $http.post('/api/login', user).then(function(data){
            userInfo = data.data;
            userInfo.isAuthenticated = true;
            $localStorage.userInfo = userInfo;
            return data;
        })
        .catch(function(err){
            return err;
        });
    }

    this.getUserInfo = function(){ //Method to get logged in user information
        if($localStorage.userInfo){
            return $localStorage.userInfo;
        }

        else{
            return null;
        }
        
    }

    this.isAuthenticated = function(){ //Method to check whether a user is logged in
        if($localStorage.userInfo){
            return $localStorage.userInfo.isAuthenticated;
        }
        else{
            return false;
        }
    }

    this.getRole = function(){ //method to get the role of the logged in user
        if($localStorage.userInfo){
            return $localStorage.userInfo.role;
        }
        else{
            return null;
        }
    }

    this.removeUserInfo = function(){ //Method to delete local storage which has the userInfo
        $localStorage.$reset();
    }
}]);