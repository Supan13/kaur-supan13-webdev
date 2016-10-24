(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);


    function ProfileController($routeParams, UserService, $location) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);

        var user = UserService.findUserById(vm.userId);

        if(user != null) {
            vm.user = user;
        }

    }
})();