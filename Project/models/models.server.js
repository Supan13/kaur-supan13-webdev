/**
 * Created by supankaur on 12/7/16.
 */
module.exports =function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/webdevProject-fall-2016');

    var userModel =require("./user/user.model.server")();
    var movieModel = require("./movie/movie.model.server")();




    var model ={
        userModel:userModel,
        movieModel:movieModel

    };

    userModel.setModel(model);
    movieModel.setModel(model);

    return model;


};