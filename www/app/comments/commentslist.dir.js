commentsModule.directive('commentsList', ['$ionicPopup', 'Login',
    function ($ionicPopup, Login) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'app/comments/commentslist.dir.html',
            scope: {
                obj: '='
            },
            link: function (scope, elem, attrs) {
                scope.$watch('obj', function(value) {
                    console.log("DBG: got dir update");
                    console.dir(value);
                });
            }
        };
    }]);