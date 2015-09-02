votesModule.directive('voteInfo', ['Votes', function (Votes) {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'app/votes/votes.dir.html',
        link: function (scope, elem, attrs) {
            scope.$on("objLoaded", function () {
                scope.obj = scope[attrs.on];
                var hasVotedChecker = Votes.hasVoted(attrs.on, scope.obj.id);
                if (hasVotedChecker != null) {
                    hasVotedChecker.then(function () {
                        //TODO: implement
                        console.log("vote directive has received data");
                    });
                }
            });
        }
    };
}]);