/**
 * Created by supankaur on 12/12/16.
 */
(function() {
    angular
        .module("MovieApp")
        .config(Config);

    function Config($routeProvider) {
        console.log("in config");
        $routeProvider

        //  .when("/admin", {
        //    templateUrl: "views/admin/user-list.view.client.html",
        //  resolve:{
        //    checkAdmin:checkAdmin
        // }
        // })
        // .when("/", {
          //     templateUrl: "views/search/search.view.client.html"

      //   })
            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
                controllerAs: "MoviesNewController",
                controllerAs: "model",
                resolve :{
                    getLoggedIn : getLoggedIn
                }
            })

            .when("/search", {
                templateUrl: "views/search/search.view.client.html",
                controller: "MovieSearchController",
                controllerAs: "model",
                resolve :{
                    getLoggedIn : getLoggedIn
                }
            })
            .when("/search/:title", {
                templateUrl: "views/search/search.view.client.html",
                controller: "MovieSearchController",
                controllerAs: "model",
                resolve :{
                    getLoggedIn : getLoggedIn
                }
            })

            .when("/details/:imdbID", {
                templateUrl: "views/details/details.view.client.html",
                controller: "MovieDetailsController",
                controllerAs: "model",
                   resolve :{
                    getLoggedIn : getLoggedIn
                 }
            })
            .when("/details/:imdbID/:title", {
                templateUrl: "views/details/details.view.client.html",
                controller: "MovieDetailsController",
                controllerAs: "model",
                resolve :{
                    getLoggedIn : getLoggedIn
                }
            })

            .when("/login", {
                templateUrl: "views/login/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                   checkLoggedIn : checkLoggedIn
                }
            })
            .when("/profile/:username?", {
                templateUrl: "views/profile/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
               resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "views/register/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo: "/home"
            })

        function getLoggedIn(UserService, $q ) {
            var deferred = $q.defer();

            UserService
               .getCurrentUser()
                .then(function(response){
                    var currentUser = response.data;
                        UserService.setCurrentUser(currentUser);
                       deferred.resolve();
               });

           return deferred.promise;
        }

          function checkLoggedIn(UserService, $q, $location) {

              var deferred = $q.defer();

              UserService
                  .getCurrentUser()
                  .then(function (response) {
                      var currentUser = response.data;
                      if (currentUser) {
                          UserService
                              .setCurrentUser(currentUser);
                          deferred.resolve();
                      } else {
                          deferred.reject();
                          $location.url("/home");
                      }
                  });

              return deferred.promise;
          }

    }
})();