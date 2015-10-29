commentsModule.directive('commentCreate', ['$ionicPopup', 'Login', 'Comment', '$timeout', 'CommentsManager',
    function ($ionicPopup, Login, Comment, $timeout, CommentsManager) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'app/comments/commentcreate.dir.html',
            link: function (scope, elem, attrs) {
                scope.showCommentBox = false;
                scope.loadCommentBox = function () {
                    scope.showCommentBox = true;
                    scope.newComment = new Comment();
                    $timeout(function () {
                        document.getElementById("comment-create-box").focus();
                    }, 750);
                };
                scope.sendComment = function () {
                    scope.newComment.owner = Login.user.id;
                    CommentsManager.createComment(scope.newComment, scope.obj, attrs.for.capitalize()).then(function (res) {
                        if (res.status && res.status == "success") {
                            scope.newComment = new Comment();
                            scope.showCommentBox = false;
                        }
                    }, function(err) {
                        console.log("ERR: there was a problem adding the comment:");
                        console.dir(err);
                    });
                }
            }
        };
    }]);