picsModule
    .controller('PicInfoCtrl', function ($scope, EventsManager, $stateParams, Resolver, moment) {
        var eventID = $stateParams.event;
        EventsManager.m.get(eventID).then(function(event) {
            Resolver.loadRefs(event);
            $scope.event = event;
            $scope.starts_text = ( moment(event.start) < moment(new Date()) )? "started":"starts";

        });
    })
;