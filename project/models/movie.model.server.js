/**
 * Created by supankaur on 12/12/16.
 */
var q = require("q");

module.exports = function( mongoose) {

    var MovieSchema = require("./movie.schema.server.js")(mongoose);
    var Movie  = mongoose.model("Movie", MovieSchema);

    var movies = [];
    var api = {
        findMovieByImdbID: findMovieByImdbID,
        findMoviesByImdbIDs: findMoviesByImdbIDs,
        createMovie: createMovie,
        userLikesMovie: userLikesMovie
    };
    return api;

    function userLikesMovie (userId, movie) {

        var deferred = q.defer();
        Movie.findOne({imdbID: movie.imdbID},

            function (err, doc) {

                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    doc.likes.push (userId);
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    movie = new Movie({
                        imdbID: movie.imdbID,
                        title: movie.Title,
                        poster: movie.Poster,
                        likes: []
                    });

                    movie.likes.push (userId);
                    movie.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findMoviesByImdbIDs (imdbIDs) {

        var deferred = q.defer();

        Movie.find({
            imdbID: {$in: imdbIDs}
        }, function (err, movies) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(movies);
            }
        })
        return deferred.promise;
    }

    function createMovie(movie) {

        // create instance of movie
        var movie = new Movie({
            imdbID: movie.imdbID,
            poster: movie.Poster,
            title: movie.Title,
            likes: []
        });

        var deferred = q.defer();

        // save movie to database
        movie.save(function (err, doc) {

            if (err) {
                // reject promise if error
                defferred.reject(err)
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findMovieByImdbID(imdbID) {

        var deferred = q.defer();

        Movie.findOne({imdbID: imdbID}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
}