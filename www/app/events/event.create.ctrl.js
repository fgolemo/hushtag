eventsModule
    .controller('EventCreateCtrl', function ($scope, EventsManager, Event, Helper, Modal, LocationsManager) {
        $scope.taskname = "Create Event";
        $scope.event = new Event();
        $scope.update = function () {
            EventsManager.m.create($scope.event).then(function (response) {
                Helper.updateCallback("event", response);
            });
        };
        LocationsManager.m.loadAll().then(function(locations) {
            $scope.locations = locations;
        });
        var locationSelect = new Modal(
            $scope,
            'app/locations/locationselect.modal.html',
            angular.noop,
            function (location) {
                if (location == null) {
                    return; // if user hits "cancel", i.e. don't change the current location
                }
                if (location == "none") {
                    delete $scope.event.locationResolved;
                    $scope.event.location = "";
                } else {
                    $scope.event.locationResolved = location;
                    $scope.event.location = location.id;
                }
            });
        locationSelect.init();
    })
;