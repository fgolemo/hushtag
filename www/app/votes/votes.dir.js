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
                        console.dir(r);
                        if (r.status && r.status == "success" && r.reply) {
                            console.log("yeah, has voted");
                        } else {
                            console.log("hasn't voted or error");
                        }
                    });
                }
            });
            scope.$emit("voterReady");
        }
    };
}]);