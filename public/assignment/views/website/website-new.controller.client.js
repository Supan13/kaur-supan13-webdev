(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesForUser(userId);
            promise
                .success(function(user){
                    vm.websites = user.websites;
                });
        }

        init();

        function createWebsite(website) {
           // website._id = (new Date()).getTime();
           // website.developerId = userId;
            WebsiteService
                .createWebsite(userId, website)
                .success(function(website){
                $location.url("/user/"+userId+"/website");
            });
        }
    }
})();
