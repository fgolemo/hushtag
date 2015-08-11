eventsModule
    .controller('EventsCtrl', ["$scope", "EventsManager", "Resolver", function ($scope, EventsManager, Resolver) {
        EventsManager.m.loadAll().then(function(events) {
            for (var i in events) {
                Resolver.loadRefs(events[i]);
            }
            $scope.events = events;
        });
    }])
;