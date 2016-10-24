(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [

            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 1", "websiteId": "789", "description": "Lorem" },
            { "_id": "523", "name": "Post 1", "websiteId": "567", "description": "Lorem" },
            { "_id": "513", "name": "Post 1", "websiteId": "678", "description": "Lorem" }
        ]

        var api = {
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function deletePage(pid) {
            for (var p in pages) {
                if (pages[p]._id == pid) {
                    pages.splice(p, 1);
                }
            }
        }

        function updatePage(page) {
            for (var p in pages) {
                if (pages[p]._id == page._id) {
                    pages[p] = page;
                }
            }
        }

        function createPage(page) {
            pages.push(page);
        }

        function findPageById(pid) {
            for (var p in pages) {
                if (pages[p]._id == pid) {
                    return pages[p];
                }
            }
            return null;
        }

        function findPageByWebsiteId(wid) {
            var result = [];
            for(var p in pages) {
                if(pages[p].websiteId == wid) {
                    result.push(pages[p]);
                }
            }
            return result;

        }

    }

    })();
