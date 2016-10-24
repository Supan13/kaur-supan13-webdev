(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        var vm = this;
        var websiteId    = parseInt($routeParams.wid);
        var pageId = parseInt($routeParams.pid);
        var userId = parseInt($routeParams.uid);
        vm.updatePage = updatePage;
        vm.removePage = removePage;

        function init() {
            vm.page = PageService.findPageById(pageId);
        }
        init();

        function updatePage(page) {
            PageService.updatePage(page);
            $location.url("/user/"+userId+"/website" +websiteId + "/page");
        }

        function removePage(pid) {
            PageService.removePage(pid);
            $location.url("/user/"+userId + "/website" + websiteId + "/page");
        }
    }
})();
