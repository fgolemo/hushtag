eventsModule
    .controller('EventInfoCtrl', function ($scope, EventsManager, $stateParams, Resolver, moment, Modal, $ionicSlideBoxDelegate) {
        var eventID = $stateParams.event;
        EventsManager.m.get(eventID).then(function(event) {
            //Resolver.loadRefs(event);
            $scope.event = event;
            $scope.starts_text = ( moment(event.start) < moment(new Date()) )? "started":"starts";
        });
        $scope.updateSlider = function () {
            $ionicSlideBoxDelegate.update(); //or just return the function
        }
        var m = new Modal($scope, "/app/pics/pic.modal.html", angular.noop, angular.noop);
        m.init();
        $scope.showImages = function(index) {
            $scope.activeSlide = index;
            $scope.modal.show();
        };
    })
;