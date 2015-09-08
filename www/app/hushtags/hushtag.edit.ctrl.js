hushtagsModule
    .controller('HushtagEditCtrl', function ($scope, $stateParams, EventsManager, $ionicPopup, $location, Helper) {
        $scope.taskname = "Edit Event";
        var eventID = $stateParams.event;
        EventsManager.m.get(eventID).then(function(event) {
            //Resolver.loadRefs(event);
            $scope.event = event;
        });
        $scope.update = function() {
            EventsManager.m.update($scope.event).then(function(response) {
                Helper.updateCallback("event", response);
            });
        };
    })
;