module.exports = function() {
    var mongoose = require('mongoose');
   // var WebsiteSchema = require("../website/website.schema.server")
    var UserSchema = mongoose.Schema({

         username : String,
         password : String,
         firstName : String,
         lastName : String,
          google : {
             id:String,
             email:String,
            token:String
        },
        facebook: {
            id:    String,
            token: String,
            displayName : String
        },
         email :String,
         phone :String,
       //  role:{type:String, enum:['ADMIN', 'STUDENT','FACULTY']},
         websites :[{type: mongoose.Schema.Types.ObjectId,ref:'websiteModel'}],
         dateCreated: {type: Date, default: Date.now}
    }, {collection:"user"});

    return UserSchema;

};
