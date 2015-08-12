eventsModule
    .controller('EventInfoCtrl', function ($scope, EventsManager, $stateParams, Resolver, moment, $ionicModal) {
        var eventID = $stateParams.event;
        EventsManager.m.get(eventID).then(function(event) {
            //Resolver.loadRefs(event);
            $scope.event = event;
            $scope.starts_text = ( moment(event.start) < moment(new Date()) )? "started":"starts";
        });
        $scope.showImages = function(index) {
            $scope.activeSlide = index;
            $scope.showModal('templates/image-modal.html');
        };

        $scope.showModal = function(templateUrl) {
            $ionicModal.fromTemplateUrl(templateUrl, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        };

        // Close the modal
        $scope.closeModal = function() {
            $scope.modal.hide();
            $scope.modal.remove()
        };

    })
;