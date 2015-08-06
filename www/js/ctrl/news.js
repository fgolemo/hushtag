controllerModule
    .controller('NewsCtrl', function($scope, Modal, TestService) {

        var m = new Modal($scope, "contact-modal.html", angular.noop, angular.noop);
        m.init();
        $scope.ts = new TestService("test");

    })
;