hushtagsModule
    .controller('HushtagEditCtrl', function ($scope, $stateParams, HushtagsManager, Helper) {
        Tags.get(true);
        $scope.taskname = "Edit Hushtag";
        var objID = $stateParams.hushtag;
        HushtagsManager.m.get(objID).then(function(hushtag) {
            //Resolver.loadRefs(event);
            $scope.hushtag = hushtag;
        });
        $scope.update = function() {
            HushtagsManager.m.update($scope.hushtag).then(function(response) {
                Helper.updateCallback("hushtag", response);
            });
        };
    })
;