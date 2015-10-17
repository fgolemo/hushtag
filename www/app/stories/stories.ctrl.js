storiesModule
    .controller('StoriesCtrl',
    ["$scope", "StoriesManager", "Resolver", "Login", "$stateParams", "HushtagsManager",
        function ($scope, StoriesManager, Resolver, Login, $stateParams, HushtagsManager) {
            var objID = $stateParams.hushtag;
            var loadobj = function(forced, cb) {
                HushtagsManager.m.get(objID, forced).then(function (obj) {
                    Resolver.loadRefs(obj, ["stories"]);
                    $scope.hushtag = obj;
                    if (cb) {
                        cb();
                    }
                });
            };
            loadobj(false);
            $scope.doRefresh = function() {
                loadobj(true, function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };
        }
    ]
);