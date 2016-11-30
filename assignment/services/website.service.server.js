module.exports = function(app, model) {


    app.get("/api/user/:userId/website", findWebsitesForUser);
    app.get('/api/website/:websiteId',findWebsiteById);
    app.post("/api/user/:userId/website", createWebsite);
    app.delete("/api/website/:wid", deleteWebsite);
    app.put("/api/website/:websiteId", updateWebsite);


    function updateWebsite(req,res) {
        var wid = req.params.wid;
        var website = req.body;
        model
            .websiteModel
            .updateWebsite(wid,website)
            .then(function (status) {
                    res.send(200);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteWebsite(req,res) {
        var wid = (req.params.wid);
        model
            .websiteModel
            .deleteWebsite(wid)
            .then(function (status) {
                    res.send(200);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        model
            .websiteModel
            .createWebsite(userId, website)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findWebsitesForUser(req, res) {
        var uid = req.params.userId;
        model
            .websiteModel
            .findWebsitesForUser(uid)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

  function findWebsiteById(req, res) {
          var websiteId = req.params.wid;
                model
                 .websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (website) {
                        if (website) {
                           res.send(website);
                           } else {
                             res.send(null);
                            }
                             }, function (error) {
                              res.sendStatus(400).send(error);
                              }
                           );
                    }
 };



