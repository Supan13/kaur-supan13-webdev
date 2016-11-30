(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams['uid'];

          function init() {
              WebsiteService
                  .findWebsitesForUser(vm.userId)
                  .success(function(user){
                        vm.websites = user.websites;
                      console.log(vm.websites);
                    });
          }
            init();
    }
})();