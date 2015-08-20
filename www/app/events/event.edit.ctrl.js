eventsModule
    .controller('EventEditCtrl', function ($scope, $stateParams, EventsManager, moment) {
        $scope.taskname = "Edit Event";
        var eventID = $stateParams.event;
        EventsManager.m.get(eventID).then(function(event) {
            //Resolver.loadRefs(event);
            event.start = moment(event.start);
            event.hasEnd = false;
            if (event.end != null && event.end != "null") {
                event.end = moment(event.end);
                event.endDate = event.end.toDate();
                event.hasEnd = true;
            }
            event.startDate = event.start.toDate();
            $scope.event = event;
        });
    })
;