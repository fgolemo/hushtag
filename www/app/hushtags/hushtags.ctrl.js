hushtagsModule
    .controller('HushtagsCtrl', function ($scope, HushtagsManager, $ionicLoading, Settings) {
        $ionicLoading.show(Settings.loadingConf);
        HushtagsManager.m.loadAll().then(function(hushtags) {
            $scope.hushtags = hushtags;
            $ionicLoading.hide();
        });
    })
;