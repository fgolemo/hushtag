hushtagsModule.directive('hushtagInfoBox', ['Settings',
    function (Settings) {
        return {
            restrict: 'E',
            replace: 'true',
            scope: true,
            templateUrl: 'app/hushtags/hushtaginfobox.dir.html',
            link: function (scope, elem, attrs) {
                scope.property = attrs.for;
                scope.showInfo = false;
                scope.limit = Settings.hushtagInfoBoxLimit
            }
        };
    }]);