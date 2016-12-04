module.exports = function(app, model) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID        : process.env.FACEBOOK_CLIENT_ID,
        clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL     : process.env.FACEBOOK_CALLBACK_URL
    };

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.post('/api/checkLogin', checkLogin);
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(facebookUser) {
                    if (facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        // var names = profile.displayName.split(" ");
                        // console.log(names);
                        facebookUser = {
                            username: profile.displayName.replace(/ /g, ''),
                            // lastName:  names[1],
                            // firstName: names[0],
                            // email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id: profile.id,
                                token: token,
                                displayName: profile.displayName
                            }
                        },
                        model.userModel
                            .createUser(facebookUser)
                            // console.log(newFacebookUser);
                            .then(
                                function (user) {
                                    done(null, user);
                                }
                            );
                    }
                })
    }


    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        //console.log(profile);
        model.userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }




    passport.serializeUser(serializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }



    passport.deserializeUser(deserializeUser);


    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    passport.use(new LocalStrategy(localStrategy));

    function localStrategy(username, password, done) {
        model.userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }


    function logout(req, res) {
        req.logOut();
        res.send(200);
    }


    function register (req, res) {
        var user = req.body;
        req.body.password = bcrypt.hashSync(req.body.password);
        model.userModel
            .createUser(user)
            .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                          //  console.log(user);
                        }
                    });
                }
            }
        );
    }

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function deleteUser(req, res) {
         var userId = req.params.uid;
         model
             .userModel
             .deleteUser(userId)
             .then(
                 function (status) {
                     res.send(200);
                 },
                 function (error) {
                     res.sendStatus(400).send(error);
                 }
             );
     }


    function createUser(req, res){
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                 function(newUser)  {
                     res.send(newUser);
                 },
                function (error){
                     res.sendStatus(400).send(error);
                }
            );
    }

        function findUser(req, res) {
            var params = req.params;
            var query = req.query;
            if (query.username && query.password) {
                findUserByCredentials(req, res);
            } else if (query.username) {
                findUserByUsername(req, res);
            }else{
                res.json(req.user);
            }
        }

            function findUserByUsername(req, res) {
                var username = req.query.username;
                model
                    .userModel
                    .findUserByUsername(username)
                    .then(
                        function (users) {
                            if (users.length>0) {
                                res.json(users[0]);
                            } else {
                                res.send("0");
                            }
                        },
                        function (error) {
                            res.sendStatus(400).send(error);
                        }
                    );

            }

       //  function findUserByCredentials(req, res) {
         //       var username = req.query.username;
           //     var password = req.query.password;
             //   model
               //     .userModel
                 //   .findUserByCredentials(username,password)
                   // .then(
                     //   function (users) {
                       //     if (users.length>0){
                         //       res.json(users[0]);
                           // } else{
                             //   res.send("0");
                           // }
                      //  },
                        //function (error) {
                          //  res.sendStatus(400).send(error);
                       // }
                   // );
           // }

            function findUserById(req, res) {
                var userId = req.params.uid;
                model
                    .userModel
                    .findUserById(userId)
                    .then(
                        function(user){
                            if(user){
                                res.json(user);
                            } else{
                                res.send('0');
                            }
                        },

                        function(error){
                            res.sendStatus(400).send(error);
                        }
            );
            }

            function updateUser(req, res){
                var user = req.body;
                var uid = req.params.uid;
                model
                    .userModel
                    .updateUser(uid, user)
                    .then(
                        function(status)  {
                            res.send(200);
                        },
                        function (error){
                            res.sendStatus(400).send(error);
                        }
                    );
            }
};


