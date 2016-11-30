module.exports = function () {
    var mongoose = require('mongoose');
   // var WebsiteSchema = require("../website/website.schema.server");
   // var WidgetSchema = require("../widget/widget.schema.server");

    var PageSchema = mongoose.Schema({
        _website:[{ type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel' }],
        name :String,
        title:String,
        description:String,
        widgets :[{type: mongoose.Schema.Types.ObjectId,ref:'widgetModel'}],
        dateCreated: {type: Date, default: Date.now}


    },{collection:"page"});

    return PageSchema;
};