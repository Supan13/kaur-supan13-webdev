/**
 * Created by supankaur on 12/12/16.
 */
module.exports = function(mongoose) {
   // var mongoose = require('mongoose');
    // var WebsiteSchema = require("../website/website.schema.server")
    var MovieSchema = require("./movie.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({

        username : String,
        password : String,
        firstName : String,
        lastName : String,
        email :String,
        phone :String,
        roles:[String],
        likes: [String],
        // movies this user likes
        likesMovies: [MovieSchema],
        //  role:{type:String, enum:['ADMIN', 'STUDENT','FACULTY']},
        dateCreated: {type: Date, default: Date.now}
    }, {collection:"project.user"});

    return UserSchema;

};
