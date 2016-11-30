module.exports = function(app, model) {


      app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
      app.post("/api/website/:websiteId/page", createPage);
      app.delete("/api/page/:pageId", deletePage);
      app.put("/api/page/:pageId", updatePage);
      app.get("api/page/:pageId", findPageById);


    function updatePage(req,res) {
        var pid = req.params.pid;
        var page = req.body;
        model
            .pageModel
            .updatePage(pid,page)
            .then(function (status) {
                    res.send(200);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePage(req,res) {
        var pid = req.params.pid;
        model
            .pageModel
            .deletePage(pid)
            .then(function (status) {
                    res.send(200);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        model
            .pageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;
        model
            .pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findPageById(req, res) {
        var pageId = req.params.pid;
        model
            .pageModel
            .findPageById(pageId)
            .then(function (page) {
                    if (page) {
                        res.json(page);
                    } else {
                        res.send(null);
                    }
                }, function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

};