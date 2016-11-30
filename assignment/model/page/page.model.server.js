module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var PageSchema = require("./page.schema.server.js")();
    var pageModel = mongoose.model("pageModel", PageSchema);
    var WebsiteSchema = require("../website/website.schema.server.js")();
    var WidgetSchema = require("../widget/widget.schema.server.js")();



    var api = {
        createPage: createPage,
        setModel: setModel,
        findPageById: findPageById,
        updatePage: updatePage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        deletePage: deletePage,
        findAllWidgetsForPage: findAllWidgetsForPage

    };

    return api;



    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId, page) {
        return pageModel
            .create(page)
            .then(function (pageObj) {
               return model
                    .websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (websiteObj) {
                            websiteObj.pages.push(pageObj)
                            pageObj._website = websiteObj._id
                            pageObj.save()
                            return websiteObj.save()
                    },
                function(error){
                    console.log(error);
                    });
            });
   }

    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findAllPagesForWebsite(websiteId);
    }

    function findPageById(pageId) {
        return pageModel.findById(pageId);
    }


    function updatePage(pageId, page) {
        return pageModel.update(
            {
                _id: pageId
            },
            {
                name: page.name,
                title: page.title,
                description: page.description
            }
        );
    }

    function deletePage(pageId) {
        return pageModel.remove({
            _id: pageId
        });

    }

  function findAllWidgetsForPage(pageId) {
       return pageModel.findById(pageId)
           .populate("widgets")
           .exec();
   }


};