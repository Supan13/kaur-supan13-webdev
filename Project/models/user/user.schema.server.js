/**
 * Created by supankaur on 12/7/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');


    var UserSchema = mongoose.Schema({
        username :String,
        password :String,
        firstName :String,
        lastName: String,
        email :String,
        dateCreated: {type: Date, default: Date.now}

    },{collection:"project.user"});

    return UserSchema;
};
{

    //  follows: [
    //    {
    //      userId: String,
    //    username: String
    // }
    //  ],
    //    rates

//    [
    //      {
    //        movie_name: String,
    //      movie_Id: String,
    //    movie_rating: Number,
    //  movie_url: String
    // }
    // ],

//        reviews
//:
    //  [
    //    {
    //      movie_name: String,
    //    movie_Id: String,
    //  movie_review: String,
    //movie_url: String,
    //movie_flagged: String
    // }
    // ]
}