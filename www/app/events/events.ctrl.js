eventsModule
    .controller('EventsCtrl', ["$scope", "EventsManager", function ($scope, EventsManager) {
        EventsManager.m.loadAll().then(function(events) {
            $scope.events = events;
        });
    }])
;