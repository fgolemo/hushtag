eventsModule
    .controller('EventsCtrl',
    ["$scope", "EventsManager", "Resolver", "Settings", "$ionicLoading",
        function ($scope, EventsManager, Resolver, Settings, $ionicLoading) {
            $ionicLoading.show(Settings.loadingConf);
            EventsManager.m.loadAll().then(function (events) {
                for (var i in events) {
                    Resolver.loadRefs(events[i], ["location"]);
                }
                $scope.events = events;
                $ionicLoading.hide();
            });

        }
    ]
);