sharedModule.factory('Modal', ['$ionicModal', '$ionicSlideBoxDelegate', function ($ionicModal, $ionicSlideBoxDelegate) {
    return function (scope, template, openCB, closeCB) {

        this.init = function () {
            $ionicModal.fromTemplateUrl(template, {
                scope: scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                scope.modal = modal;
            });
            scope.openModal = function() {
                $ionicSlideBoxDelegate.update();
                scope.modal.show();
                if (openCB) {
                    openCB();
                }
            };
            scope.closeModal = function(element) {
                scope.modal.hide();
                if (closeCB) {
                    closeCB(element);
                }
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
            scope.changeSlide = function(index) {
                scope.activeSlide = index;
                $ionicSlideBoxDelegate.slide(index);
            }
        };

    };

}]);