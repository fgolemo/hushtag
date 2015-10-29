commentsModule.directive('commentCreate', ['$ionicPopup', 'Login', 'Comment', '$timeout', 'CommentsManager',
    function ($ionicPopup, Login, Comment, $timeout, CommentsManager) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'app/comments/commentcreate.dir.html',
            link: function (scope, elem, attrs) {
                scope.showCommentBox = false;
                scope.loadCommentBox = function () {
                    console.log("DBG: click");
                    scope.showCommentBox = true;
                    scope.newComment = new Comment();
                    $timeout(function () {
                        document.getElementById("comment-create-box").focus();
                    }, 750);
                };
                scope.sendComment = function () {
                    scope.newComment.owner = Login.user.id;
                    console.log("parent:");
                    console.dir(scope.obj);
                    CommentsManager.createComment(scope.newComment, scope.obj, attrs.for.capitalize()).then(function (res) {
                        console.log("DBG: got feedback after creating comment");
                        console.dir(res);
                    }, function(err) {
                        console.log("ERR: there was a problem adding the comment:");
                        console.dir(err);
                    });
                }
            }
        };
    }]);