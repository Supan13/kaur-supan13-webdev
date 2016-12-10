/**
 * Created by supankaur on 12/8/16.
 */
(function () {
     angular
         .module("MovieApp")
         .factory("MovieService", MovieService);

    function MovieService($http){

           var api = {

             "searchMovieByTitle": searchMovieByTitle,
               "searchMovieByImdbID" : searchMovieByImdbID

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

        // function likeMovie(imdbID, callback){
          //  var likes = {
            //    userId: 123,
              //  imdbID:imdbID
          //  };
            // $http.post("/api/user/"+userId+"/movie/"+imdbID+"/like")
              // .success(callback);

         //}
    }


})();

//
//(function(){
  //  angular
    //    .module("MovieApp")
      //  .factory("MovieService",MovieService);

  //  var api_key = "18185344a72984eec50d35c57c2702a6";


  //  function MovieService($http){
    //    var api = {
      //      "searchMovieByTitle":searchMovieByTitle,
        //    "searchMovieByID":searchMovieByID,
          //  "findNowPlaying": findNowPlaying,
      //  };
      //  return api;

        //function searchMovieByTitle(title){
          //  var url="http://api.themoviedb.org/3/search/movie?api_key="+api_key+"&query="+title+"&page=1&language=en&include_adult=false";
          //  return $http.get(url);

       // }

       // function searchMovieByID(imdbID){
         //   return $http.get("http://api.themoviedb.org/3/movie/"+imdbID+"?api_key="+api_key+"&append_to_response=videos,credits,reviews")


//        }

  //      function findNowPlaying(){

    //        var url = "http://api.themoviedb.org/3/movie/now_playing?api_key=" + api_key;
      //      return $http.get(url);

//        }


        /* function searchMovieByID(imdbID){
         var appendTags = 'videos,credits,reviews';
         $http.get(baseUrl + '/movie/' + id + '?api_key=' + apikey + '&append_to_response=' + appendTags)
         .success(callback);
         // var url= "https://api.themoviedb.org/3/movie/"+imdbID+"?api_key=a86449ea2cfd20a925fdab399e815028"+"&append_to_response="+appendTags;
         //var url = "http://www.omdbapi.com/?i="+imdbID;
         //  var url="http://api.themoviedb.org/3/search/movie?api_key=a86449ea2cfd20a925fdab399e815028&query=star&page=1&language=en";
         $http.get("http://api.themoviedb.org/3/movie/"+imdbID+"?api_key=a86449ea2cfd20a925fdab399e815028&append_to_response=videos,credits,reviews")
         .success(callback);
         return $http.get(url);
         }*/
