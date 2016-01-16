commentsModule.directive('commentCreate', ['$ionicPopup', 'Login', 'Comment', '$timeout', 'CommentsManager', 'Tags', '$ionicPopover', '$window',
    function ($ionicPopup, Login, Comment, $timeout, CommentsManager, Tags, $ionicPopover, $window) {
        Tags.get(true);
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'app/comments/commentcreate.dir.html',
            link: function (scope, elem, attrs) {
                scope.tags = Tags;
                scope.showCommentBox = false;
                scope.loadCommentBox = function () {
                    scope.showCommentBox = true;
                    scope.newComment = new Comment();
                    $timeout(function () {
                        $window.document.getElementById("comment-create-box").focus();
                    }, 750);

                };
                scope.sendComment = function () {
                    scope.newComment.owner = Login.user.id;
                    CommentsManager.createComment(scope.newComment, scope.obj, attrs.for.capitalize()).then(function (res) {
                        if (res.status && res.status == "success") {
                            scope.newComment = new Comment();
                            scope.showCommentBox = false;
                        }
                    }, function (err) {
                        console.log("ERR: there was a problem adding the comment:");
                        console.dir(err);
                    });
                };
                // .fromTemplateUrl() method
                $ionicPopover.fromTemplateUrl('/app/tags/tagselect.popover.html', {
                    scope: scope
                }).then(function (popover) {
                    scope.popover = popover;
                });

                scope.poHandler = {
                    openPopover: function ($event, matches) {
                        scope.popover.show($event);
                        scope.popover.matches = matches;
                    },
                    closePopover: function (selectedMatch) {
                        if (selectedMatch && selectedMatch.name && selectedMatch.name.length > 0) {
                            scope.newComment.content = Tags.insertTag(scope.newComment.content, selectedMatch);
                            scope.popover.hide();
                            $timeout(function () {
                                $window.document.getElementById("comment-create-box").focus();
                            }, 800);
                        }
                    }
                };
                //Cleanup the popover when we're done with it!
                scope.$on('$destroy', function () {
                    scope.popover.remove();
                });
                // Execute action on hide popover
                scope.$on('popover.hidden', function () {
                    // Execute action
                });
                // Execute action on remove popover
                scope.$on('popover.removed', function () {
                    // Execute action
                });

            }
        };
    }]);