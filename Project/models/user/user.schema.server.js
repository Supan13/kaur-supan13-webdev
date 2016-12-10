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
