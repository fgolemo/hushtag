eventsModule
    .controller('EventsCtrl',
    ["$scope", "EventsManager", "Resolver", "Login",
        function ($scope, EventsManager, Resolver, Login) {
            $scope.login = Login;
            EventsManager.m.loadAll().then(function (events) {
                for (var i in events) {
                    Resolver.loadRefs(events[i], ["location"]);
                }
                $scope.events = events;
            });

        }
    ]
);