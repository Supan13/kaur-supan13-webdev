/**
 * Created by supankaur on 12/13/16.
 */
(function() {
    angular
        .module("MovieApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService, $scope) {
        var vm = this;


        function init() {
          var currentUser = UserService.getCurrentUser();
           if(currentUser == null){

                $location.url("/home");
            }
          //  UserService
            //    .getProfile()
              //  .then(function(response){
               //  vm.profile = response.data;
                 //   console.log(vm.profile);

               // })

        }

        return init();
        $scope.updateUser = updateUser;

        function updateUser (user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            $scope.currentUser = UserService.updateUser(user);

            if (user) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.message = "Unable to update the user";
            }
        }

    }

})();
