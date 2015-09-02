eventsModule
    .controller('EventInfoCtrl', function ($scope, EventsManager, $stateParams, Resolver, moment, Modal, $ionicSlideBoxDelegate, Login, Settings) {
        var eventID = $stateParams.event;
        var loadEvent = function(forced, cb) {
            EventsManager.m.get(eventID, forced).then(function (event) {
                Resolver.loadRefs(event, null, true);
                $scope.event = event;
                $scope.starts_text = ( moment(event.start) < moment(new Date()) ) ? "started" : "starts";
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
            return (Login.isLoggedIn() &&
            Login.user && Login.user.rep &&
            ($scope.event.organizer == Login.user.id ||
            Login.user.rep[0] >= Settings.rep.edit));
        };
        $scope.doRefresh = function() {
            loadEvent(true, function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    })
;