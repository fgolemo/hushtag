tagsModule.service('Tags', ['Settings', '$q', '$http', function (Settings, $q, $http) {

    this.tags = [];

    this.get = function (force) {
        var scope = this;

        var deferred = $q.defer();

        if (JSON.stringify(this.tags) != "[]" && (!force || force == null)) {
            console.log("loading from cache");
            deferred.resolve(this.tags);

        } else {
            $http.get(Settings.database + "tags")
                .success(function (data) {
                    if (data.status && data.status == "success") {
                        scope.tags = data.tags;
                        deferred.resolve(scope.tags);
                    } else {
                        console.log("ERR: couldn't refresh tags although server comm was fine");
                        deferred.reject(data);
                    }

                })
                .error(function (err) {
                    console.log("ERR: couldn't refresh tags");
                    deferred.reject(err);
                });
        }
        return deferred.promise;
    }

}]);