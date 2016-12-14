//var mock = require("./user.mock.json");

var q = require("q");

module.exports = function(mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);

    var api = {

        findUserByCredentials: findUserByCredentials,
        createUser : createUser,
        findUserById : findUserById,
        findUsersByIds: findUsersByIds,
        userLikesMovie: userLikesMovie

    };

    return api;

    function findUserById(userId){
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
           if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function userLikesMovie (userId, movie) {

        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {

                doc.likes.push (movie.imdbID);

                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }

    function findUsersByIds (userIds) {
        var deferred = q.defer();

        UserModel.find({
            _id: {$in: userIds}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function createUser(user){

        var deferred = q.defer();

        UserModel.create(user, function (err, doc){

            //console.log(doc);
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        UserModel.findOne(

            { username: credentials.username,
                password: credentials.password },

            function(err, doc) {

                if (err) {

                    deferred.reject(err);
                } else {

                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }


};