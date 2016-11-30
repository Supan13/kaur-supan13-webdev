module.exports = function () {
    var mongoose = require('mongoose');
   // var PageSchema = require("../page/page.schema.server");
    var WebsiteSchema = mongoose.Schema({
        _user:[{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }],
        name :String,
        description :String,
        pages :[{type: mongoose.Schema.Types.ObjectId,ref:'pageModel'}],
        dateCreated: {type: Date, default: Date.now}


    },{collection:"website"});

    return WebsiteSchema;
};