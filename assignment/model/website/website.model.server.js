module.exports =function () {
    var model ={};
    var mongoose = require('mongoose');
    var WebsiteSchema =  require("./website.schema.server.js")();
    var websiteModel = mongoose.model("websiteModel",WebsiteSchema);
    var PageSchema =  require("../page/page.schema.server.js")();

    var api = {
        createWebsite  : createWebsite,
        findWebsitesForUser :findWebsitesForUser,
        setModel:setModel,
        findWebsiteById:findWebsiteById,
        updateWebsite:updateWebsite,
        deleteWebsite:deleteWebsite,
        findAllPagesForWebsite:findAllPagesForWebsite

    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsite(userId,website) {
        return websiteModel
            .create( website)
            .then(function (websiteObj) {
                 model
                    .userModel
                    .findUserById(userId)
                    .then(function (userObj) {
                            userObj.websites.push(websiteObj)
                            websiteObj._user = userObj._id
                            websiteObj.save()
                            userObj.save();
                            return userObj;
                    },
                        function(error){
                     console.log(error);
                    });
            });
    }

    function findWebsitesForUser(userId){
        return model.userModel.findWebsitesForUser(userId);
    }

    function findWebsiteById(websiteId) {
        return websiteModel.findById(websiteId);
    }


    function updateWebsite(websiteId,website) {
        return websiteModel.update(
            {
                _id : websiteId
            },
            {   name :website.name,
                description :website.description
            }
        );
    }

    function deleteWebsite(websiteId) {
        return websiteModel.remove({
            _id : websiteId
        });

    }

    function findAllPagesForWebsite(websiteId) {
        return websiteModel
            .findById(websiteId)
            .populate("pages","name")
            .exec();
    }


};
