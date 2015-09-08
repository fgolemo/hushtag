hushtagsModule
    .controller('HushtagCreateCtrl', function ($scope, EventsManager, Event, Helper, Modal, LocationsManager) {
        $scope.taskname = "Create Event";
        $scope.event = new Event();
        $scope.update = function () {
            EventsManager.m.create($scope.event).then(function (response) {
                Helper.updateCallback("event", response);
            });
        };
    })
;