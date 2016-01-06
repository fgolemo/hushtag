eventsModule
    .controller('EventEditCtrl', function ($scope, $stateParams, EventsManager, $ionicPopup, $location, Helper, Tags) {
        Tags.get(true);
        $scope.taskname = "Edit Event";
        var eventID = $stateParams.event;
        EventsManager.m.get(eventID).then(function(event) {
            //Resolver.loadRefs(event);
            $scope.event = event;
        });
        $scope.update = function() {
            EventsManager.m.update($scope.event).then(function(response) {
                Helper.updateCallback("event", response);
            });
        };
    })
;