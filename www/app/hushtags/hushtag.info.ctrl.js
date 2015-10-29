hushtagsModule
    .controller('HushtagInfoCtrl', function ($scope, HushtagsManager, $stateParams, Resolver, moment, Modal, $ionicSlideBoxDelegate, Login, $state) {
        var objID = $stateParams.hushtag;
        var loadobj = function(forced, cb) {
            HushtagsManager.m.get(objID, forced).then(function (obj) {
                Resolver.loadRefs(obj, null, true);
                $scope.obj = obj;
                HushtagsManager.m.getComments(objID);
                if (cb) {
                    cb();
                }
            });
        };
        loadobj(false);
        $scope.updateSlider = function () {
            $ionicSlideBoxDelegate.update(); //or just return the function
        };
        var m = new Modal($scope, "/app/pics/pic.modal.html", angular.noop, angular.noop);
        m.init();
        $scope.showImages = function (index) {
            $scope.activeSlide = index;
            $scope.modal.show();
        };
        $scope.canEdit = function () {
            if ($scope.obj) {
                return Login.canEdit($scope.obj.owner, 1);
            }
            return false;
        };
        $scope.doRefresh = function() {
            loadobj(true, function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
    })
;