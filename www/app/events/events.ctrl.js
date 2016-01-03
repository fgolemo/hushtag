eventsModule
    .controller('EventsCtrl',
    ["$scope", "EventsManager", "Resolver", "Login", "Tags",
        function ($scope, EventsManager, Resolver, Login, Tags) {
            $scope.login = Login;
            var loadData = function(force, cb) {
                EventsManager.m.loadAll(force).then(function (events) {
                    for (var i in events) {
                        Resolver.loadRefs(events[i], ["location"]);
                    }
                    $scope.events = events;
                    if (cb) {
                        cb();
                    }
                });
            };
            loadData(false);
            $scope.doRefresh = function() {
                loadData(true, function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };
            $scope.randomGenre = function(eventID) {
                var genres = [
                    "house",
                    "house",
                    "salsa",
                    "electronica",
                    "dance"
                ];
                if (eventID-1 < genres.length) {
                    return genres[eventID-1];
                } else {
                    return genres[Math.floor(Math.random()*genres.length)];
                }
            };
        }
    ]
);