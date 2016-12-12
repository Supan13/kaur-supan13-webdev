/**
 * Created by supankaur on 12/8/16.
 */
(function(){
    angular
        .module("MovieApp")
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/user/home/home.view.html"
              //  resolve: {
                //    getLoggedIn: getLoggedIn
              //  }
            })
            .when("/login", {
                templateUrl: "views/user/login/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile/:username?", {
                templateUrl: "views/user/profile/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
              //  resolve: {
                //    checkLoggedIn: checkLoggedIn
               // }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.client.html",
                controller: "MovieSearchController",
                controllerAs: "model"
               // resolve: {
                 //   getLoggedIn: getLoggedIn
              //  }
            })
            .when("/search/:title", {
                templateUrl: "views/search/search.view.client.html",
                controller: "MovieSearchController",
                controllerAs: "model"
            })
            .when("/details/:imdbID/:title", {
                templateUrl: "views/details/details.view.client.html",
                controller: "MovieDetailsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

  //  function getLoggedIn(UserService, $q) {
    //    var deferred = $q.defer();
//
  //      UserService
    //        .getCurrentUser()
      //      .then(function(response){
        //        var currentUser = response.data;
          //      UserService.setCurrentUser(currentUser);
            //    deferred.resolve();
           // });

//        return deferred.promise;
  //  }

  //  function checkLoggedIn(UserService, $q, $location) {

    //    var deferred = $q.defer();

      //  UserService
        //    .getCurrentUser()
          //  .then(function(response) {
            //    var currentUser = response.data;
              //  if(currentUser) {
                //    UserService.setCurrentUser(currentUser);
                  //  deferred.resolve();
              //  } else {
                //    deferred.reject();
                  //  $location.url("/home");
               // }
           // });

       // return deferred.promise;
  //  }
})();