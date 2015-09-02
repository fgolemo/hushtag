hushtagsModule
    .controller('HushtagsCtrl', function ($scope, HushtagsManager) {
        var loadData = function(cb) {
            HushtagsManager.m.loadAll().then(function(hushtags) {
                $scope.hushtags = hushtags;
                if (cb) {
                    cb();
                }
            });
        };
        loadData();
        $scope.doRefresh = function() {
            loadData(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    })
;