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
// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


//app.use(cookieParser());
//app.use(session({
  //secret: 'this is the secret',
    //resave: true,
  // saveUninitialized: true
//}));

//app.use(passport.initialize());
//app.use(passport.session());

//var connectionString='mongodb://Supan13:dentist13@cluster1-shard-00-00-jotid.mongodb.net:27017,cluster1-shard-00-01-jotid.mongodb.net:27017,cluster1-shard-00-02-jotid.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster1-shard-0&authSource=admin';
var connectionString = 'mongodb://127.0.0.1:27017/wam-fall-2016';
var mongoose = require("mongoose");
mongoose.connect(connectionString);

var PostSchema = mongoose.Schema({
     title : {type: String, required: true},
     body  : String,
     posted : {type: Date, default: Date.now}

}, {collection :'post'});

var PostModel = mongoose.model("PostModel", PostSchema);


app.post("/api/blogpost", createPost);
app.get("/api/blogpost", getAllPosts);
app.delete("/api/blogpost/:id", deletePost);
app.get("/api/blogpost/:id", getPostById);
app.put("/api/blogpost/:id", updatePost);

function updatePost(req,res){
      var postId = req.params.id;
      var post = req.body;
       PostModel
           .update({_id: postId}, {
               title: post.title,
               body: post.body
           })
           .then( function(status){
                res.sendStatus(200);

           },
               function (err){
               res.sendStatus(400);

               }
           );

}

function getPostById(req, res){
      var postId = req.params.id;
      PostModel
          .findById(postId)
          .then( function(post){
             res.json(post);
          },
          function (err){
              res.sendStatus(400);
          }
          )

}

function deletePost(req, res){
   var postId = req.params.id;
    PostModel
        .remove({_id:postId})
        .then(
            function (status){
              res.sendStatus(200);
            },
            function (){
                res.sendStatus(400);
            }
        )

}

function getAllPosts(req, res){
      PostModel
          .find()
          .then(
              function (posts){
                 res.json(posts);
              },
              function (err){
                res.sendStatus(400);
              }
          );

}

function createPost(req,res){
    var post = req.body;
   // console.log('hello from server');
  //  console.log(post);
    PostModel
        .create(post)
        .then(
            function (postObj){
                res.json(200);
            },
            function (error){
                res.sendStatus(400);
            }
        );

}


//require ("./test/app.js")(app);
require("./assignment/app.js")(app);
//require("./project/app.js")(app);




app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || 3000 ));
app.listen(app.get('port'), app.get('ipaddress'));
