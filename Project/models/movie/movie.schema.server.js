/**
 * Created by supankaur on 12/9/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');


    var MovieSchema = mongoose.Schema({
        movieId :String,
        movieTitle:String,
        moviePosterUrl :String,
        _user:[{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }],
        dateCreated: {type: Date, default: Date.now}

    },{collection:"project.movie"});

    return MovieSchema;
};
