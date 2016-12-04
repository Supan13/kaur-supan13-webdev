(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);


    function ProfileController($routeParams, UserService, $location, $rootScope) {
        var vm = this;

       // vm.userId = $rootScope.currentUser._id;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {

            var promise = UserService
             //  .findUserById(vm.userId)
               .findCurrentUser()
            promise
                .success( function(user){
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error(function(){
                });
        }

        init();

        function updateUser(){
               UserService.updateUser(vm.user);
        }

       function logout(){
            UserService.logout()
                .success(function() {
                    $location.url("/login");

      });
       }

        function deleteUser(){
            UserService
                .deleteUser(vm.user._id)
                .success (function(){
                $location.url("/login");
            })
                .error (function(){

                });
        }
    }
})();