module.exports = function(app) {

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Watchmaker <a href="http://gizmodo.com/tag/mbf" rel="nofollow">MB&amp;F</a> isn’t as well-known as  Rolex or Timex, but that’s because the company’s unique creations—like a <a href="http://gizmodo.com/listen-to-an-18-000-tie-fighter-music-box-play-the-sta-1717444112" rel="nofollow">TIE Fighter-shaped music box</a> that plays the <em>Star Wars</em> theme—are made for die-hard collectors. Its latest creation is a <a href="https://www.mbandf.com/en/machines/co-creations/astrograph" target="_blank" rel="noopener">rocket-shaped pen inspired by the moon landing</a>, and I’m desperately trying to justify…<span class="read-more-placeholder"></span><span class="readmore-core-decorated"></span></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

        var multer = require('multer');
        var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

        app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
        app.post ("/api/upload", upload.single('myFile'), uploadImage);
        app.put("/page/:pageId/widget", updateWidget );

      function updateWidget(){

          var start = req.query.start;
          var end = req.query.end;
          widgets.splice(end, 0, widgets.splice(start, 1)[0]);
      }


        function uploadImage(req, res) {


            var widgetId      = req.body.widgetId;
            var width         = req.body.width;
            var myFile        = req.file;
            var originalname  = myFile.originalname;
            var filename      = myFile.filename;
            var path          = myFile.path;
            var destination   = myFile.destination;
            var size          = myFile.size;
            var mimetype      = myFile.mimetype;

            res.send(myFile);
        }



    function findAllWidgetsForPage(req, res){
            var pid = req.params.widgetId;
            var result = [];
            for(var w in widgets) {
                if(widgets[w].pageId == pid) {
                    result.push(widgets[w]);
                }
            }
            return result;

        }

    }




