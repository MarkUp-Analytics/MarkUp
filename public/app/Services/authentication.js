peercentileApp.service('authentication', ['$http', '$localStorage', 
function($http, $localStorage){
    var userInfo = {};
    userInfo.isAuthenticated = false;
    
    this.createUser = function(newUser){
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
    this.login = function(user){
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

    this.getUserInfo = function(){
        if($localStorage.userInfo){
            return $localStorage.userInfo;
        }

        else{
            return null;
        }
        
    }

    this.removeUserInfo = function(){
        $localStorage.$reset();
    }
}]);