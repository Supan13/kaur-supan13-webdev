/**
 * Created by supankaur on 12/12/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var MovieSchema = mongoose.Schema({
        imdbID: String,
        title: String,
        poster: String,
        // ids of users that like this movie
        likes: [String],
        userLikes: [
            {username: String}
        ],

    }, {collection: 'project.movie'});

    return MovieSchema;

};