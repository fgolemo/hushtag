eventsModule
    .controller('EventsCtrl', function ($scope, Manager, Modal) {
        var eventManager = new Manager("Event");
        eventManager.loadAll().then(function(events) {
            $scope.events = events;
        });
        var m = new Modal($scope, "app/events/events.modal.html", function(){console.log("opened event modal")}, angular.noop);
        m.init();
        console.log("modal setup for event done");
    })
;