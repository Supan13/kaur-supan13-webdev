/**
 * Created by supankaur on 12/9/16.
 */
module.exports =function () {
    var model = {};
    var mongoose = require('mongoose');
    var MovieSchema = require("./movie.schema.server.js")();
    var movieModel = mongoose.model("movieModel", MovieSchema);


    var api = {
        //createWebsite  : createWebsite,
       // findWebsitesForUser :findWebsitesForUser,
        setModel:setModel,

    };

    return api;

    function setModel(_model) {
        model = _model;
    }


}
