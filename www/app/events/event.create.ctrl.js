eventsModule
    .controller('EventCreateCtrl', function ($scope, EventsManager, Event) {
        $scope.taskname = "Create Event";
        $scope.event = new Event();
        $scope.update = function() {};
    })
;