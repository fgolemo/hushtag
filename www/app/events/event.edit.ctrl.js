eventsModule
    .controller('EventEditCtrl', function ($scope, $stateParams, EventsManager, $ionicPopup, $location) {
        $scope.taskname = "Edit Event";
        var eventID = $stateParams.event;
        EventsManager.m.get(eventID).then(function(event) {
            //Resolver.loadRefs(event);
            $scope.event = event;
        });
        $scope.update = function() {
            EventsManager.m.update($scope.event).then(function(response) {
                if (response.status == "success") {
                    $ionicPopup.alert({
                        title: "Done",
                        template: "Event successfully updated"
                    }).then(function() {
                        $location.path("/app/home/events/"+eventID);
                    });
                } else {
                    $ionicPopup.alert({
                        title: "That didn't work",
                        template: response.msg
                    });
                }
            });
        };
    })
;