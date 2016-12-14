/**
 * Created by supankaur on 12/13/16.
 */
//(function(){
  //  angular
    //    .module("MovieApp")
      //  .controller("DetailsController", DetailsController);

   // function DetailsController($routeParams, OmdbService, $rootScope, $location, MovieService) {
     //   var vm = this;
       // var imdbID = $routeParams.imdbID;
       // var currentUser = $rootScope.currentUser;
        //var currentUser = UserService.getCurrentUser;(or implement this)
      //  vm.favorite = favorite;

       // function init() {
         //   OmdbService
           //     .findMovieByImdbID (imdbID)
             //   .then(function(response){
               //     vm.data = response.data;
              //  });

           // MovieService
             //   .findUserLikes (imdbID)
              //  .then(function(response){
                //    vm.movie = response.data;
              //  });
      //  }
      //  init();

       // function favorite(movie) {
         //   if(currentUser) {
           //     vm.movie.likes = [];
             //   vm.movie.likes.push(currentUser._id);
              //  MovieService
                //    .userLikesMovie(currentUser._id, movie);
           // } else {
             //   $location.url("/login");
          //  }
      //  }
    //}
//})();

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