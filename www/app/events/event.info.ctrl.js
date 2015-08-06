eventsModule
    .controller('EventInfoCtrl', function ($scope, EventsManager, $stateParams) {
        var eventID = $stateParams.event;
        EventsManager.m.get(eventID).then(function(event) {
            $scope.event = event;
        });
    })
;