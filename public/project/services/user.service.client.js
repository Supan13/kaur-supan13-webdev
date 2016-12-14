/**
 * Created by supankaur on 12/13/16.
 */
(function() {
    angular
        .module("MovieApp")
        .factory("UserService", UserService);


    function UserService($http, $rootScope) {

        var api = {
          //  findUserByCredentials: findUserByCredentials,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout : logout,
            createUser: createUser,
            getProfile: getProfile,
            login:login,
            updateUser: updateUser

        };

        return api;

        function getProfile(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);

        }


     //   function getProfile(){
       //         return $http.get("/api/profile/"+$rootScope.currentUser._id);
       // }

        function createUser(user){
            console.log(user);
            return $http.post("/api/register", user);
        }

        function logout(){

            return $http.post("/api/logout");
        }

        function getCurrentUser(){

            return $http.get("/api/loggedin");
        }

        function setCurrentUser(user){
               $rootScope.currentUser = user;
              // console.log($rootScope.currentUser);

        }


     //   function findUserByCredentials(credentials) {
       //     console.log(credentials);
         //   return $http.post("/api/login", credentials);

       // }

        function login(username,password) {
            var user = {
                username:username,
                password:password
            };
            return $http.post("/api/login", user);
        }
        function updateUser (currentUser) {
            var user = model.findUserByUsername (currentUser.username);
            if (user != null) {
                user.firstName = currentUser.firstName;
                user.lastName = currentUser.lastName;
                user.password = currentUser.password;
                return user;
            } else {
                return null;
            }
        }

      //  function login(credentials) {
        //    return $http.post("/api/login", credentials);
       // }
    }

})();