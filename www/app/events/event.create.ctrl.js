eventsModule
    .controller('EventCreateCtrl', function ($scope, EventsManager, Event, Helper) {
        $scope.taskname = "Create Event";
        $scope.event = new Event();
        $scope.update = function () {
            EventsManager.m.create($scope.event).then(function (response) {
                Helper.updateCallback("event", response);
            });
        };
    })
;