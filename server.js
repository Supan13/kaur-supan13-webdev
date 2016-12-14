var express = require('express');
//var cookieParser  = require('cookie-parser');
//var session       = require('express-session');
var app = express();
//var passport      = require('passport');
var bodyParser = require('body-parser');
//var multer        = require('multer');
//var mongoose      = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(cookieParser());
//app.use(session({
  //secret: 'this is the secret',
    //resave: true,
  // saveUninitialized: true
//}));

//app.use(passport.initialize());
//app.use(passport.session());

//var connectionString='mongodb://Supan13:dentist13@cluster0-shard-00-00-4bzso.mongodb.net:27017,cluster0-shard-00-01-4bzso.mongodb.net:27017,cluster0-shard-00-02-4bzso.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
var connectionString = 'mongodb://127.0.0.1:27017/wam-fall-2016';



var mongoose = require("mongoose");
mongoose.connect(connectionString);
// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


//require ("./test/app.js")(app);
//require("./assignment/app.js")(app);
require("./project/app.js")(app,mongoose);




app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || 3000 ));
app.listen(app.get('port'), app.get('ipaddress'));
