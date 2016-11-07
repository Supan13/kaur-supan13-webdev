(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var pages = [

            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 1", "websiteId": "789", "description": "Lorem"},
            {"_id": "523", "name": "Post 1", "websiteId": "567", "description": "Lorem"},
            {"_id": "513", "name": "Post 1", "websiteId": "678", "description": "Lorem"}
        ];

        var api = {
            findAllPagesForWebsite: findAllPagesForWebsite,
            findPageById: findPageById,
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function deletePage(pid) {
            var url = "/api/page/" + pid;
            return $http.delete(url);
        }


        function updatePage(page) {
            var url = "/api/page/" + pid;
            return $http.delete(url);
        }

        function createPage(wid, page) {
            var url = "/api/website/"+wid+"/page";
            return $http.post(url, page);
        }

        function findPageById(pid) {
            for (var p in pages) {
                if (pages[p]._id == pid) {
                    return pages[p];
                }
            }
            return null;
        }

        function findAllPagesForWebsite(wid, uid) {
            var url = "/api/website/"+wid+"/page";
            return $http.get(url);

        }

    }

    })();
