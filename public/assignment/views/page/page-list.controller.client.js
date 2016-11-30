(function (){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId, vm.userId)

                .success(function(website){
                   vm.pages = website.pages;
                    console.log(vm.pages);
             });
        }

        init();
    }
})();
