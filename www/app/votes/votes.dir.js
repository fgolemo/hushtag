votesModule.directive('voteInfo', ['Votes', function (Votes) {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'app/votes/votes.dir.html',
        link: function (scope, elem, attrs) {
            console.log("DIR: setting up reception of events");
            scope.$on("objLoaded", function () {
                scope.obj = scope[attrs.on];
                console.log("received notification for object loaded:"+scope.obj.id);
                var hasVotedChecker = Votes.hasVoted(attrs.on, scope.obj.id);
                if (hasVotedChecker != null) {
                    hasVotedChecker.then(function () {
                        //TODO: implement
                        console.log("vote directive has received data");
                    });
                }
            });
            console.log("DIR: sending the ready for events");
            scope.$emit("voterReady");
        }
    };
}]);