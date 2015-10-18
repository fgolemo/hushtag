commentsModule.directive('commentCreate', ['$ionicPopup', 'Login', 'Comment', '$timeout',
    function ($ionicPopup, Login, Comment, $timeout) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'app/comments/commentcreate.dir.html',
            link: function (scope, elem, attrs) {
                scope.commentObj = scope[attrs.for];
                scope.showCommentBox = false;
                scope.loadCommentBox = function() {
                    scope.showCommentBox = true;
                    scope.newComment = new Comment();
                    $timeout(function() {
                        document.getElementById("comment-create-box").focus();
                    },750);

                }
            }
        };
    }]);