votesModule.directive('voteInfo', function() {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'app/votes/votes.dir.html',
        link: function(scope, elem, attrs) {
            scope.obj = scope[attrs.on];
        }
    };
});