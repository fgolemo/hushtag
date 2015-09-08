sharedModule.provider("naviCreator", function () {
        function generateConfig(name, urlSuffix, tmplSuffix, ctrlSuffix) {
            var conf = {
                url: '/' + name + 's' + urlSuffix,
                views: {}
            };
            conf.views[name + 's'] = {
                templateUrl: 'app/' + name + 's/' + name + tmplSuffix + '.html',
                controller: name.capitalize() + ctrlSuffix + 'Ctrl'
            };
            return conf;
        }

        function addNaviFor(name, basePath, $stateProvider) {
            var navName = basePath + '.' + name;
            $stateProvider
                .state(navName + 's', generateConfig(name, '', 's', 's'))
                .state(navName + 's/create', generateConfig(name, '/create', '.edit', 'Create'))
                .state(navName, generateConfig(name, '/:' + name, '.info', 'Info'))
                .state(navName + 'edit', generateConfig(name, '/:' + name + '/edit', '.edit', 'Edit'))
            ;
        }

        function init() {
            // Return the public API.
            return ({});
        }

        return ({
            addNaviFor: addNaviFor,
            $get: init
        });
    }
);
