/**
 * Created by supankaur on 12/8/16.
 */

(function () {
    angular
        .module("MovieApp")
        .controller("MovieDetailsController", MovieDetailsController)

    function MovieDetailsController($routeParams, MovieService, $location) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        vm.title = $routeParams.title;
        console.log("hello from details controller" + imdbID);

        function init() {
            MovieService
                .searchMovieByImdbID(imdbID)
                .success(function (response) {
                    vm.movie = response;
                });
        }

        init();
    }
})();