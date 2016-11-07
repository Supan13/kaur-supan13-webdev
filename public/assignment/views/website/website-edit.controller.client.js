(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId    = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesForUser(userId);
            promise
                .success(function(websites){
                    vm.websites = websites;
                });
        }
        init();



        function updateWebsite() {
            WebsiteService
                .updateWebsite(websiteId)
                .success( function(){
                    $location.url("/user/"+userId+"/website");
                })
                .error (function(){
                });
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(websiteId)
                .success (function(){
                    $location.url("/user/"+userId+"/website");
                })
                .error (function(){
                });
        }
    }
})();
