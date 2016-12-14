/**
 * Created by supankaur on 12/13/16.
 */
//(function(){
  //  angular
    //    .module("MovieApp")
      //  .factory("MovieService", MovieService);

  //  function MovieService($http){

    //     var api = {
      //      setUserLikesMovie: setUserLikesMovie
      //   };

        // return api;

//        function setUserLikesMovie(userId, movie){

  //          console.log([userId, imdbID]);
    //        return $http.post("/api/user/"+userId+"/movie/"+movie.imdbID, movie);
      //  }

  //  }
  //  })();
(function () {
    angular
        .module("MovieApp")
        .factory("MovieService", MovieService);

    function MovieService($http){

        var api = {

            "searchMovieByTitle": searchMovieByTitle,
            "searchMovieByImdbID" : searchMovieByImdbID,
            "latestMovies":latestMovies

        };

        return api;

        function searchMovieByTitle(title){
            var url = "http://www.omdbapi.com/?s=" + title;
            return $http.get(url);

        }

       function searchMovieByImdbID(imdbID){
            var url = "http://www.omdbapi.com?i=" + imdbID;
           return $http.get(url);

        }

        function latestMovies() {
            var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=da1749c71841d55056213eb79c7b574c&language=en-US&include+adult=false";
            return $http.get(url);
        }




    }


})();
