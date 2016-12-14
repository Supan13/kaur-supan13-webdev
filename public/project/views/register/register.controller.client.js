/**
 * Created by supankaur on 12/13/16.
 */
(function() {
    angular
        .module("MovieApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;


        function init(){

        }

        init();

        function register(user) {
            console.log(user);
            UserService
                .createUser(user)
                .then(function (response) {
                var currentUser = response.data;
                if (currentUser != null) {
                    UserService.setCurrentUser(currentUser);
                    $location.url("/profile");
                }

            })

        }


    }


})();