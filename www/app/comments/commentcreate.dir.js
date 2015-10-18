commentsModule.directive('commentCreate', ['$ionicPopup', 'Login', 'Comment',
    function ($ionicPopup, Login, Comment) {
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
                }
            }
        };
    }]);