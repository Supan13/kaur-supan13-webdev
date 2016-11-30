(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {


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
            var url = "/api/page/" + page._id;
            return $http.put(url, page);
        }

        function createPage(wid, page) {
            var url = "/api/website/"+wid+"/page";
            return $http.post(url, page);
        }

        function findPageById(pid) {
           var url = "/api/page/" +pid;
            return $http.get(url);
        }

        function findAllPagesForWebsite(wid) {
            var url = "/api/website/"+wid+"/page";
            return $http.get(url);

        }

    }

    })();
