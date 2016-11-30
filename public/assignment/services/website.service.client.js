(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {


        var api = {
            findWebsitesForUser: findWebsitesForUser,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            findWebsiteById:findWebsiteById,
            deleteWebsite: deleteWebsite
        };
        return api;

        function deleteWebsite(wid) {
            var url = "/api/website/" + wid;
            return $http.delete(url);
        }

        function findWebsiteById(wid) {
            var url = "/api/website/"+wid;
            return $http.get(url)
        }

        function updateWebsite(wid) {
               var url = "/api/website/" +wid;
               return $http.put(url);
        }

        function createWebsite(uid, website) {
           var url = "/api/user/" +uid+ "/website";
           return $http.post(url,website);
        }


        function findWebsitesForUser(uid) {
            var url = "/api/user/" +uid+"/website";
             return $http.get(url);
        }
    }
})();
