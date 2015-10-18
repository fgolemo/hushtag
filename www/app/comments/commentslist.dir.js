commentsModule.directive('commentsList', ['$ionicPopup', 'Login',
    function ($ionicPopup, Login) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'app/comments/commentslist.dir.html',
            link: function (scope, elem, attrs) {
                scope.commentObj = scope[attrs.for];
            }
        };
    }]);