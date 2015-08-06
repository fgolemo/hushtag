eventsModule
    .controller('EventsCtrl', function ($scope, Manager, Modal) {
        var eventManager = new Manager("Event");
        eventManager.loadAll().then(function(events) {
            $scope.events = events;
        });
        var m = new Modal($scope, "app/events/events.modal.html", angular.noop, angular.noop);
        m.init();
    })
;