(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        var vm = this;
        var websiteId    = $routeParams.wid;
        var pageId = $routeParams.pid;
        var userId = $routeParams.uid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findAllPagesForWebsite(websiteId,userId)
                .success(function(website){
                    vm.pages = website.pages;
                });

            PageService
                .findPageById(pageId)
                .success(function(page) {
                    vm.page = page;
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
