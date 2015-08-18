sharedModule.service('Localstorage', ['$window', function ($window) {

    this.set = function (key, value) {
        $window.localStorage[key] = value;
    };
    this.get = function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
    };
    this.setObject = function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
    };
    this.getObject = function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
    };
    this.remove = function (key) {
        $window.localStorage.removeItem(key);
    }
}]);