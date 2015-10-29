eventsModule
    .controller('EventInfoCtrl', function ($scope, EventsManager, $stateParams, Resolver, moment, Modal, $ionicSlideBoxDelegate, Login) {
        var eventID = $stateParams.event;
        var voterReady = false;
        $scope.$on("voterReady", function() {
            voterReady = true;
        });
        var loadEvent = function(forced, cb) {
            EventsManager.m.get(eventID, forced).then(function (event) {
                Resolver.loadRefs(event, null, true);
                $scope.obj = event;
                $scope.starts_text = ( moment(event.start) < moment(new Date()) ) ? "started" : "starts";
                if (voterReady) {
                    $scope.$broadcast("objLoaded");
                } else {
                    $scope.$on("voterReady", function() {
                        $scope.$broadcast("objLoaded");
                    });
                }
                EventsManager.m.getComments(eventID);
                if (cb) {
                    cb();
                }
            });
        };
        loadEvent(false);
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
            if (!$scope.obj || $scope.obj == {} || $scope.obj == null) {
                return false;
            }
            return Login.canEdit($scope.obj.owner, 0);
        };
        $scope.doRefresh = function() {
            loadEvent(true, function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.getHeroStyle = function (eventID) {
            if ($scope.obj && JSON.stringify($scope.obj) != "{}" && $scope.obj.header && $scope.obj.header != "") {
                //return "background-image: url('/img/ev-h-"+$scope.obj.header+"')";
                return "background-image: url('/img/ev-h-"+headers[eventID-1]+"')";
            } else {
                return "";
            }
        };
        var headers = [
            "ste.jpg",
            "mel.jpg",
            "fie.jpg"
        ];
    })
;