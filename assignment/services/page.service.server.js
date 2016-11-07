module.exports = function(app) {


    var pages = [

        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 1", "websiteId": "789", "description": "Lorem"},
        {"_id": "523", "name": "Post 1", "websiteId": "567", "description": "Lorem"},
        {"_id": "513", "name": "Post 1", "websiteId": "678", "description": "Lorem"}
    ];

      app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
      app.post("/api/website/:websiteId/page", createPage);
      app.delete("/api/page/:pageId", deletePage);
      app.put("/api/page/:pageId", updatePage);

    function updatePage(req, res){
        var pid = req.params.pageId;
        for (var p in pages) {
            if (pages[p]._id == pid) {
                pages[p] = page;
            }
        }
        res.send(pages);

    }

    function deletePage(req, res){
            var pid = req.params.pageId;
            for (var p in pages) {
                if (pages[p]._id == pid) {
                    pages.splice(p, 1);
                }
            }
            res.send(pages);
        }


    function createPage(req, res) {
            var page = req.body;
            pages.push(page);
            res.send(pages);
        }


    function findAllPagesForWebsite(req, res) {
         var wid = req.params.websiteId;
         var result = [];
        for(var p in pages) {
            if(pages[p].websiteId == wid) {
                result.push(pages[p]);
            }
        }
        res.json(result);
    }



};