sharedModule.factory('Modal', ['$ionicModal', function ($ionicModal) {
    return function (scope, template, openCB, closeCB) {

        this.init = function () {
            console.log("starting modal setup for "+template);
            $ionicModal.fromTemplateUrl(template, {
                scope: scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                console.log("set up: modal from "+template);
                scope.modal = modal;
            });
            scope.openModal = function() {
                scope.modal.show();
                openCB();
            };
            scope.closeModal = function() {
                scope.modal.hide();
                closeCB();
            };
            //Cleanup the modal when we're done with it!
            scope.$on('$destroy', function() {
                scope.modal.remove();
            });
            // Execute action on hide modal
            scope.$on('modal.hidden', function() {
                // Execute action
            });
            // Execute action on remove modal
            scope.$on('modal.removed', function() {
                // Execute action
            });
        };

    };

}]);