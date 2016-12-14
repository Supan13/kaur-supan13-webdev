/**
 * Created by supankaur on 12/13/16.
 */
(function() {
    angular
        .module("MovieApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = function login(username,password) {
                UserService
                    .login(username,password)
                    .then(function(response){
                        if(response.data) {
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
                        }
                    });
            }

    }


})();