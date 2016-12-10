(function () {
    angular
        .module("MovieApp")
        .controller("MovieSearchController", MovieSearchController)


    function MovieSearchController(MovieService, $routeParams, $location){
       // console.log("hello from movie controller");
        var vm = this;
        vm.searchMovieByTitle = searchMovieByTitle;
        vm.title = $routeParams.title;

        function init () {
            if (vm.title) {
                // $location.url("/search/"+title);
                //  $location.path("/home/"+vm.title);
                searchMovieByTitle(vm.title);

            }
        }

         //   MovieService.findNowPlaying()
           //     .success(function(result){
             //       vm.movies = result.results;
               // })
       // }

        init();

        function searchMovieByTitle(title){
            console.log(title);
            MovieService
                .searchMovieByTitle(title)
                .success(function(result){
                    vm.movies = result.Search;

                });
        }

    }


})();