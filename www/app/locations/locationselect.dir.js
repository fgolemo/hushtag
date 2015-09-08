locationsModule.directive('locationSelect', ['Modal', 'LocationsManager',
    function (Modal, LocationsManager) {
        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'app/locations/locationselect.dir.html',
            link: function (scope, elem, attrs) {
                scope.obj = scope[attrs.on];
                LocationsManager.m.loadAll().then(function(locations) {
                    scope.locations = locations;
                });
                var locationSelect = new Modal(
                    scope,
                    'app/locations/locationselect.modal.html',
                    angular.noop,
                    function (location) {
                        if (location == null) {
                            return; // if user hits "cancel", i.e. don't change the current location
                        }
                        if (location == "none") {
                            delete scope[attrs.on].locationResolved;
                            scope[attrs.on].location = "";
                        } else {
                            scope[attrs.on].locationResolved = location;
                            scope[attrs.on].location = location.id;
                        }
                    });
                locationSelect.init();
            }
        };
    }]);