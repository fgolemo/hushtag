hushtagsModule
    .controller('HushtagsCtrl', function ($scope, HushtagsManager, Helper) {
        var loadData = function(cb) {
            HushtagsManager.m.loadAll().then(function(hushtags) {
                hushtags.sort(Helper.nameComparator);
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
        };
        $scope.firstLetter = function(name) {
            return name && name.charAt(0).toUpperCase();
        };
    })
;