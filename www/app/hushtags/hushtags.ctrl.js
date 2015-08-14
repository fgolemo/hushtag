hushtagsModule
    .controller('HushtagsCtrl', function ($scope, HushtagsManager) {
        HushtagsManager.m.loadAll().then(function(hushtags) {
            $scope.hushtags = hushtags;
        });
    })
;