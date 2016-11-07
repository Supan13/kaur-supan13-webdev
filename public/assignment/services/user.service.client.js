(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        { "_id":"123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        { "_id":"234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        { "_id":"345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        { "_id":"456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function UserService($http) {

        var api = {
            findUserByCredentials : findUserByCredentials,
            findUserById : findUserById,
            createUser : createUser,
            findUserByUsername : findUserByUsername,
            updateUser : updateUser,
            deleteUser : deleteUser
    };
        return api;

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

        function deleteUser(uid) {
            var url = "/api/user/" + uid;

            return $http.delete(url);
        }

    }

})();
