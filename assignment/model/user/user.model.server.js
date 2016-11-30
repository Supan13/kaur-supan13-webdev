module.exports = function() {
     var model = {};
     var mongoose = require("mongoose");
     var UserSchema = require("./user.schema.server.js")();
     var userModel = mongoose.model("userModel", UserSchema);

    var api = {

        createUser : createUser,
        findUserById : findUserById,
        updateUser : updateUser,
        findUserByCredentials : findUserByCredentials,
        findWebsitesForUser : findWebsitesForUser,
        deleteUser : deleteUser,
        findUserByUsername: findUserByUsername,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

     function findWebsitesForUser(userId){
          return userModel
              .findById(userId)
              .populate("websites", "name")
              .exec();

     }


    function deleteUser(userId){
        return userModel.remove({_id: userId
        });
    }


    function findUserByCredentials(username, password){
          return userModel.find({
              username: username,
              password:password
          });

    }

   function findUserByUsername(username) {
       return userModel.find({
           username: username
        });
    }



    function updateUser(userId, user) {
        return userModel
              .update(
            {
                _id: userId
            },
            {
                firstName: user.firstName,
                lastName: user.lastName
            }
        );
    }


    function findUserById(userId){
         userModel.find({_id:userId})
        return userModel.findById(userId);

    }

    function createUser(user){
        return userModel.create(user);

    }

};

