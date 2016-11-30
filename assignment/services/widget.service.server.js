module.exports = function(app, model) {


    var multer = require('multer');

    var upload = multer({ dest: __dirname+'/../public/assignment/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pageId/widget", sortWidgets);


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        model
            .widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function (widgetObj) {
                    res.send(widgetObj);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        model.widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function(widgets) {
                res.json(widgets);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel
            .findWidgetById(widgetId)
            .then(function(widget) {
                res.json(widget)
            });
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;

        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function uploadImage(req, res) {

        var myFile        = req.file;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var developerId   = req.body.developerId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;

        var originalname  = myFile.originalname;
        var filename      = myFile.filename;
        var path          = myFile.path;
        var destination   = myFile.destination;
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;



        var url = "/assignment/uploads/"+myFile.filename;


        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    widget.width = width;
                    widget.url = url;
                    model.widgetModel
                        .updateWidget(widgetId, widget);
                }
            )
            .then(
                function (status) {
                    res.redirect("/assignment/index.html#/user/"+developerId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function sortWidgets(req, res) {
        var pageId = req.params.pageId;
        var startIndex = req.query.initial;
        var endIndex = req.query.final;

        model.widgetModel
            .reorderWidget(pageId, startIndex, endIndex)
            .then(
                function (status) {
                    return res.json(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );


    }
};







