controllerModule
    .controller('EventsCtrl', function ($scope, Manager) {
        var eventManager = new Manager("Event");
        eventManager.loadAll().then(function(events) {
            $scope.events = events;
        });
    })
;