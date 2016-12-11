/**
 * Created by supankaur on 12/8/16.
 */
(function () {
    angular
        .module("MovieApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/search/search.view.client.html",
                controller: "MovieSearchController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.client.html",
                controller: "MovieSearchController",
                controllerAs: "model"
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
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller:"RegisterController",
                controllerAs: "model"
            })

        function checkLogin($q, UserService, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(
                    function (user) {
                        if (user != '0') {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        } else {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }

    }


})();



