/**
 * Created by supankaur on 12/12/16.
 */
// pass db and mongoose reference to server side application module
module.exports = function(app) {
    console.log("hello from app js");
    var model = require("./models/model.server.js")();
    require("./services/user.service.server.js")(app, model);
    require("./services/movies.service.server.js")(app, model);
}
