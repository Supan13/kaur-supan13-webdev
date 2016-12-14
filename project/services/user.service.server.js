/**
 * Created by supankaur on 12/12/16.
 */
module.exports = function(app, userModel, movieModel) {

    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUnitialized: true
    }));
    app.use(cookieParser());

    app.post("/api/login", login);
    app.get("/api/loggedin", loggedin);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get("/api/profile/:userId", getProfile);



    function getProfile(req, res) {
        var userId = req.params.userId;
        var user = null;

        userModel.findUserById(userId)
            .then(
                function (doc) {
                    user = doc;
                    return movieModel.findMoviesByImdbIDs(doc.likes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (movies) {

                    user.likesMovies = movies;
                    res.json(user);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }


    function register(req, res){
        var user = req.body;
       // console.log(user);
      //  res.send(200);
        user = userModel.createUser(user)
        .then(
            function(doc){
                req.session.currentUser= doc;
                res.json(user);
            },
            function(err){
                res.status(400).send(err);
            }
        );

    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }
};


