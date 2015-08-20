sharedModule.directive('goClick', function ($location) {
    return function (scope, element, attrs) {
        element.bind('click', function () {
            scope.$apply(function () {
                $location.path(attrs.goClick);
            });
        });
    };
});