hushtagsModule
    .controller('HushtagsCtrl', function ($scope, Manager) {
        var hushtagManager = new Manager("Hushtag");
        hushtagManager.loadAll().then(function(hushtags) {
            $scope.hushtags = hushtags;
        });
    })
;