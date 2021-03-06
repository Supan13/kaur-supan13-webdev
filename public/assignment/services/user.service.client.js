(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);


    function UserService($http) {

        var api = {
           findUserByCredentials : findUserByCredentials,
           findUserById : findUserById,
            createUser : createUser,
            findUserByUsername : findUserByUsername,
            updateUser : updateUser,
            deleteUser : deleteUser,
            login:login,
            checkLogin:checkLogin,
            logout:logout,
            register:register,
           findCurrentUser: findCurrentUser
    };
        return api;

       function findCurrentUser(){
          var url = "/api/user";
           return $http.get(url);
        }

        function register(username,password){
            var user = {
                username:username,
                password:password
     };
            return $http.post("/api/register", user);
        }

        function checkLogin(){
            return $http.post("/api/checkLogin");
        }

        function logout(){
           return $http.post("/api/logout");
        }

        function login(username,password) {
                 var user = {
                     username:username,
                     password:password
                 };
                return $http.post("/api/login", user);
       }


        function findUserByCredentials(username, password) {
            var url = '/api/user?username=' + username + '&password=' + password;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = '/api/user?username='+username;
            return $http.get(url);
        }



        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);

        }

        function updateUser(user) {
            var url = "/api/user/"+ user._id;
            return $http.put(url, user);
        }

       function createUser(username, password) {
            var user = {
                username : username,
                password : password
           };
           return $http.post("/api/user", user);
       }

        function findUser() {
            return $http.get("/api/user");
        }

        function deleteUser(uid) {
            var url = "/api/user/" + uid;

            return $http.delete(url);
        }

    }

})();
