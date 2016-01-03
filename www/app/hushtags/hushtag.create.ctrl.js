hushtagsModule
    .controller('HushtagCreateCtrl', function ($scope, HushtagsManager, Hushtag, Helper) {
        Tags.get(true);
        $scope.taskname = "Create Hushtag";
        $scope.hushtag = new Hushtag();
        $scope.update = function () {
            HushtagsManager.m.create($scope.hushtag).then(function (response) {
                Helper.updateCallback("hushtag", response);
            });
        };
    })
;