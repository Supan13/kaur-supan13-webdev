
(function(){
    angular
        .module("MoviesApp")
        .factory("MovieService",MovieService);

    function MovieService($http){
        var api = {
            "searchMovieByTitle":searchMovieByTitle,
            "searchMovieByID":searchMovieByID,
            "latestMovies":latestMovies,
            popularMovies:popularMovies
           // "popularMoviesByYear":popularMoviesByYear
        };
        return api;

        function searchMovieByTitle(title){
            //var url = "http://www.omdbapi.com/?s="+title;
            var url="http://api.themoviedb.org/3/search/movie?api_key=da1749c71841d55056213eb79c7b574c&query="+title+"&page=1&language=en&include_adult=false";
            return $http.get(url);
        }

        function searchMovieByID(imdbID){

            return $http.get("http://api.themoviedb.org/3/movie/"+imdbID+"?api_key=da1749c71841d55056213eb79c7b574c&append_to_response=videos,credits,reviews");
            //return $http.get(url);

        }

        function latestMovies(){
            var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=da1749c71841d55056213eb79c7b574c&region=US&include_adult=false";
            return $http.get(url);
        }

        function popularMovies(){
            var url = "http://api.themoviedb.org/3/movie/popular?api_key=da1749c71841d55056213eb79c7b574c&region=US&include_adult=false";
            return $http.get(url);
        }


    }
})();