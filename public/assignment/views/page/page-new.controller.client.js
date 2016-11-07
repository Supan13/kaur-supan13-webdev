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
            var promise = PageService.findAllPagesForWebsite(websiteId, userId);
            promise
                .success(function(pages){
                    vm.pages = pages;
                });
        }

        init();

        function createPage(page) {
            page._id = (new Date()).getTime();
            page.websiteId = websiteId;
            PageService
                .createPage(websiteId, page)
                .success(function(){
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                });
        }
    }
})();

