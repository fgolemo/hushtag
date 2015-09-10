hushtagsModule.directive('synonymSelect', ['Modal', 'Settings',
    function (Modal, Settings) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'app/hushtags/synonymselect.dir.html',
            link: function (scope, elem, attrs) {
                scope.synonyms = JSON.parse(JSON.stringify(scope.hushtag.synonyms)) || [];
                scope.limit = Settings.hushtagInfoBoxLimit;
                var selectModal = new Modal(
                    scope,
                    'app/hushtags/synonymselect.modal.html',
                    function() {
                        scope.synonyms = JSON.parse(JSON.stringify(scope.hushtag.synonyms)) || [];
                    },
                    function (synonyms) {
                        if (synonyms != null) {
                            scope.hushtag.synonyms = JSON.parse(JSON.stringify(synonyms)) || [];
                        }
                    });
                selectModal.init();
            }
        };
    }]);