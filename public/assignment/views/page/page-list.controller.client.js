(function (){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.websiteId = parseInt($routeParams.wid);
        vm.userId = parseInt($routeParams.uid);

        function init() {
            var promise = PageService.findAllPagesForWebsite(vm.websiteId, vm.userId);
            promise
                .success(function(pages){
                   vm.pages = pages;
             });
        }

        init();
    }
})();
