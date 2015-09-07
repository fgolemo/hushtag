votesModule.directive('voteInfo', ['Votes', '$ionicPlatform', '$cordovaToast', '$ionicPopup',
    function (Votes, $ionicPlatform, $cordovaToast, $ionicPopup) {
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
                var vote = function(updown) {
                    var operation = (updown=="up"?"up":"down")+"vote";
                    Votes[operation](attrs.on, scope.obj.id).then(function (response) {
                        if (response.data && response.data.status && response.data.status == "success") {
                            scope.doRefresh();
                            $ionicPlatform.ready(function () {
                                try {
                                    $cordovaToast.show(updown+"voted", "short", "center");
                                } catch (err) {
                                    console.log("ERROR: cordova not working");
                                }
                            });
                        } else if (response.data && response.data.status && response.data.status == "fail") {
                            $ionicPopup.alert({
                                title: "Oh noes.",
                                template: msg
                            });
                        }
                    });
                };
                scope.upvote = function () {
                    vote("up");
                };
                scope.downvote = function () {
                    vote("down");
                };
            }
        };
    }]);