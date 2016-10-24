(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {
        var vm = this;
        var websiteId = parseInt($routeParams.wid);
        var userId = parseInt($routeParams.uid);
        vm.createPage = createPage;

        function init() {
            vm.pages= PageService.findPageByWebsiteId(websiteId);
        }
        init();

        function createPage(page) {
            page._id = (new Date()).getTime();
            page.uid = websiteId;
            console.log(page);
            PageService.createPage(page);
            $location.url("/user/"+ userId + "/website/" + websiteId + "/page");
        }
    }
})();

