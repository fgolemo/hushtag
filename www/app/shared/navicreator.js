sharedModule.provider("naviCreator", function () {
        return ({
            addNaviFor: addNaviFor,
            $get: init
        });

        function addNaviFor (name, basePath, $stateProvider) {
            $stateProvider
                .state(basePath + '.' + name + 's', {
                    url: '/' + name + 's',
                    views: {
                        'events': {
                            templateUrl: 'app/' + name + 's/' + name + 's.html',
                            controller: name.capitalize() + 'sCtrl'
                        }
                    }
                })
                .state(basePath + '.' + name + 'create', {
                    url: '/' + name + 's/create',
                    views: {
                        'events': {
                            templateUrl: 'app/' + name + 's/' + name + '.edit.html',
                            controller: name.capitalize() + 'CreateCtrl'
                        }
                    }
                })
                .state(basePath + '.' + name, {
                    url: '/' + name + 's/:' + name,
                    views: {
                        'events': {
                            templateUrl: 'app/' + name + 's/' + name + '.info.html',
                            controller: name.capitalize() + 'InfoCtrl'
                        }
                    }
                })
                .state(basePath + '.' + name + 'edit', {
                    url: '/' + name + 's/:' + name + '/edit',
                    views: {
                        'events': {
                            templateUrl: 'app/' + name + 's/' + name + '.edit.html',
                            controller: name.capitalize() + 'EditCtrl'
                        }
                    }
                });
        }

        function init() {
            // Return the public API.
            return ({});
        }

    }
);
