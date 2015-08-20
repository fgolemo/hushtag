sharedModule.directive('goClick', function ($location) {
    return function (scope, element, attrs) {
        console.log("target:");
        console.log(attrs.goClick);
        element.bind('click', function () {
            scope.$apply(function () {
                $location.path(attrs.goClick);
            });
        });
    };
});