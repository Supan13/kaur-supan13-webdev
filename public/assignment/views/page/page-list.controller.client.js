(function (){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.websiteId = parseInt($routeParams.wid);
        vm.userId = parseInt($routeParams.uid);

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId, vm.userId);
        }
        init();
    }
})();
