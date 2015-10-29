commentsModule.directive('commentCreate', ['$ionicPopup', 'Login', 'Comment', '$timeout', 'CommentsManager',
    function ($ionicPopup, Login, Comment, $timeout, CommentsManager) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'app/comments/commentcreate.dir.html',
            link: function (scope, elem, attrs) {
                scope.$on("objLoaded", function () {
                    scope.commentObj = scope[attrs.for];
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
                        console.log("parent:");
                        console.dir(scope.commentObj);
                        CommentsManager.m.createComment(scope.newComment, scope.commentObj, attrs.for.capitalize(), function (res) {
                            console.log("got feedback after creating comment");
                            console.dir(res);
                        });
                    }
                });
            }
        };
    }]);