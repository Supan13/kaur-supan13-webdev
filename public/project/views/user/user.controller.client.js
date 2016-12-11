/**
 * Created by supankaur on 12/9/16.
 */

(function () {
    angular
        .module("MovieApp")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)

    function RegisterController( $location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password) {
            var promise = UserService
                .register(username, password);
            promise
                .success(function (user) {
                    $location.url("/user/" + user._id);
                })
                .error(function (error) {

                })
        }
    }

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = function (username, password) {
            UserService
                .login(username, password)
                .success(function (user) {
                    if (user === '0') {
                        vm.error = "No such user";
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })

                .error(function () {

                })
        }

    }

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;

        //vm.userId = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {

            var promise = UserService
            //.findUserById(vm.userId);
                .findCurrentUser()
            promise
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error(function () {
                });
        }

        init();

        function updateUser() {
            UserService.updateUser(vm.user);
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.user._id)
                .success(function () {
                    $location.url("/login");
                })
                .error(function () {

                });
        }

        function logout() {
            UserService
                .logout()
                .success(function () {
                    $location.url("/login");

                });
        }

    }
})();