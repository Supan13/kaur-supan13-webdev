/**
 * Created by supankaur on 12/7/16.
 */
module.exports =function () {
    var model ={};
    var mongoose = require('mongoose');
    var UserSchema =  require("./user.schema.server.js")();
    var userModel = mongoose.model("userModel",UserSchema);


    var api = {
        createUser   : createUser,
        findUserById :findUserById,
        updateUser   : updateUser,
        findUserByCredentials:findUserByCredentials,
        deleteUser : deleteUser,
        findUserByUsername :findUserByUsername,
        setModel:setModel
    };

    return api;


    function setModel(_model) {
        model = _model;
    }


    function updateUser(userId, user) {
        return userModel
            .update(
                {
                    _id: userId
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email :user.email
                }
            );
    }

    function createUser(user) {
        return userModel.create(user);
    }

    function deleteUser(userId) {
        return userModel.remove({
            _id : userId
        });
    }


    function findUserByCredentials(username,password) {
        // return UserModel.find({_id : userId});
        return userModel.findOne({
            username:username,
            password:password
        });
    }

    function findUserByUsername(username) {
        // return UserModel.find({_id : userId});
        return userModel.findOne({
            username:username
        });
    }

    function findUserById(userId) {
        // return UserModel.find({_id : userId});
        userModel.find({_id:userId})
        return userModel.findById(userId);
    }
};