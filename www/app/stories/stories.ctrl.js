storiesModule
    .controller('StoriesCtrl',
    ["$scope", "StoriesManager", "Resolver", "Login",
        function ($scope, StoriesManager, Resolver, Login) {
            //$scope.login = Login;
            //var loadData = function(force, cb) {
            //    EventsManager.m.loadAll(force).then(function (events) {
            //        for (var i in events) {
            //            Resolver.loadRefs(events[i], ["location"]);
            //        }
            //        $scope.events = events;
            //        if (cb) {
            //            cb();
            //        }
            //    });
            //};
            //loadData(false);
            //$scope.doRefresh = function() {
            //    loadData(true, function() {
            //        $scope.$broadcast('scroll.refreshComplete');
            //    });
            //}
        }
    ]
);