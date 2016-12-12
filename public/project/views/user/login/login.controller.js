/**
 * Created by supankaur on 12/11/16.
 */

(function(){
    angular
        .module("MovieApp")
        .controller("LoginController", loginController);

    function loginController ($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {
            var user = UserService.findUserByCredentials({username: user.username, password: user.password});
            if (user) {
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }
})();
//

//(function() {
  //  angular
    //    .module("MovieApp")
      //  .controller("LoginController", loginController);

//     function loginController(UserService){

  //       var vm = this;
    //      vm.login = login;
      //   function init(){

//         }

//         init();
  //       function login(user){
    //         console.log(user);
      //       UserService
        //     findUserByCredentials(credentials)({
          //      username:user.username,
            //     password:user.password
            // })
       //  }
   //  }

//})();