eventsModule
    .controller('EventCreateCtrl', function ($scope, EventsManager, Event, Helper, Tags) {
        Tags.get(true);
        $scope.taskname = "Create Event";
        $scope.event = new Event();
        $scope.update = function () {
            EventsManager.m.create($scope.event).then(function (response) {
                Helper.updateCallback("event", response);
            });
        };
    })
;