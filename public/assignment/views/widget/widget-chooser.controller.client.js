(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, $location,
                                     WidgetService) {
        var vm = this;
        vm.createWidget = createWidget;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;


        function init() {

        }

        init();

        function createWidget(widgetType) {
            var newWidget = {
                widgetType: widgetType,
                text: "Enter text",
                size: 8,
                width: 100,
                url: "http://www.google.com"
            };

            WidgetService
                .createWidget(vm.pid, newWidget)
                .success(function (addedWidget) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + addedWidget._id);
                });
        }


    }
})();
