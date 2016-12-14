/**
 * Created by supankaur on 12/12/16.
 */
// pass db and mongoose reference to server side application module
module.exports = function(app,db,mongoose) {
    console.log("hello from app js");
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel, movieModel);
    var movieModel = require("./models/movie.model.server.js")(db, mongoose);
    var movieService = require("./services/movie.service.server.js")(app, movieModel, userModel);
};
