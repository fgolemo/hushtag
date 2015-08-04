serviceModule.factory('TestService', function() {
    return function(name) {
        this.name = name;

        this.hello = function() {
            return "Hello " + this.name;
        };
    };

});