
(function() {
    angular
        .module("MovieApp")
        .controller("MoviesNewController", MoviesNewController);

    function MoviesNewController(MovieService,$routeParams,$location) {
        var vm=this;
        vm.searchMovieByTitle=searchMovieByTitle;
        vm.title=$routeParams.title;

        function init(){

            MovieService.latestMovies()
                .success(function (result) {
                    vm.movies=result.results;
                });
            if(vm.title){

                $location.path("/home/"+vm.title);
                searchMovieByTitle(vm.title);
            }

        } init();

        function searchMovieByTitle(title) {
            MovieService.searchMovieByTitle(vm.title)
                .success(function (result) {
                    vm.movies=result.results;
                });
            console.log(vm.title);
        }

    }
})();