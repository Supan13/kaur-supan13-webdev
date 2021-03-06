(function() {

    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

   function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password) {
            var promise = UserService
                .register(username, password);
           promise
                .success(function (user) {
                    $location.url("/user/" + user._id);
                })
                .error(function (err) {
                    vm.error = err;
               })
        }
    }


})();

