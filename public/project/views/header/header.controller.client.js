/**
 * Created by supankaur on 12/13/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("HeaderController", HeaderController);

  function HeaderController($location, $scope, UserService, MovieService, $routeParams) {
      var vm = this;
        vm.$location = $location;
        vm.logout = logout;
      vm.searchMovieByTitle=searchMovieByTitle;
      vm.title=$routeParams.title;

              function logout() {
                UserService
                  .logout()
                  .then(function () {
                  UserService.setCurrentUser(null)
                $location.url("/home");
          });
        }

        function init() {
            MovieService.latestMovies()
                .success(function (result) {
                    vm.movies = result.results;
                });

        }
        init();

      function searchMovieByTitle(title) {
          console.log("in serach movie by title home controller");
          MovieService.searchMovieByTitle(vm.title)
              .success(function (result) {
                  console.log("success in controller search by title");
                  console.log(result.results);
                  vm.pmovies=result.results;
              });
          console.log(vm.title);
      }

  }
})();