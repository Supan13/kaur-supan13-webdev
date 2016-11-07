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
        vm.deletePage = deletePage;

        function init() {
            var promise = PageService.findAllPagesForWebsite(websiteId, userId);
            promise
                .success(function(pages){
                    vm.pages = pages;
                });
        }

        init();


        function updatePage() {
            PageService
                .updatePage(pageId)
                .success( function(){
                    $location.url("/user/"+userId+"/website/" +websiteId + "/page");
                })
                .error (function(){
                })
        }

        function deletePage() {
            PageService
                .deletePage(pageId)
                .success( function(){
                    $location.url("/user/"+userId + "/website/" + websiteId + "/page");
                })
                .error (function() {
                });
           }
        }

})();
