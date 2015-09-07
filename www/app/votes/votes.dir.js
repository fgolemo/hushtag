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
                    hasVotedChecker.then(function (response) {
                        var r = response.data;
                        scope.obj.hasVoted = !!(r.status && r.status == "success" && r.reply);
                    });
                }
            });
            scope.$emit("voterReady");
            scope.upvote = function() {
                Votes.upvote(attrs.on, scope.obj.id);
            };
            scope.downvote = function() {
                Votes.downvote(attrs.on, scope.obj.id);
            };
        }
    };
}]);