//(function(){
  //  angular
    //    .module("MovieApp")
      //  .controller("HeaderController", headerController);

(function(){
    angular
        .module("MovieApp")
        .controller("HeaderController", headerController);

    function headerController($location, $scope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();

//
//(function(){
  //  angular
    //    .module("MovieApp")
      //  .controller("NavigationController", navigationController)

//    function navigationController($location){

  //       var vm = this;
    //    function init(){
      //      vm.$location = $location;

//        }
  //      init();

//    }

//})();