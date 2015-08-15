usersModule.service('UsersManager', ['Manager', '$http', 'User', function (Manager, $http, User) {
    var ManagerMod = function () {
        this._load = function (id, deferred) {
            var scope = this;
            if (id == 0) {
                var anon = new User();
                anon.becomeAnonymous();
                var instance = scope._retrieveInstance(anon.id, anon);
                deferred.resolve(instance);
            } else {
                $http.get(this.server + 'user/' + id)
                    .success(function (data) {
                        var instance = scope._retrieveInstance(data.id, data);
                        deferred.resolve(instance);
                    })
                    .error(function () {
                        deferred.reject();
                    });
            }

        };
    };
    ManagerMod.prototype = new Manager("User");
    this.m = new ManagerMod();
}]);