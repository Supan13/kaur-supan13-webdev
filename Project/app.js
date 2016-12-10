module.exports = function(app) {
    console.log("hello from app js");
    var model = require("./models/models.server")();
   // require("./services/homepage.service.server")(app);
    require("./services/user.service.server")(app,model);
    //require("./services/movie.service.server")(app,model);


};
