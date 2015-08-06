sharedModule.factory('Manager', ['$http', '$q', 'Hushtag', function ($http, $q, Hushtag) {
    return function (objName) {
        this._objCreator = function(data){
            switch (objName) {
                case "Hushtag":
                    return new Hushtag(data);
                    break;
                //case "HushtagUse":
                //    return new Hushtag(data);
                //    break;
                //case "Comment":
                //    return new Comment(data);
                //    break;
                //case "Tag":
                //    return new Tag(data);
                //    break;
                //case "Pic":
                //    return new Pic(data);
                //    break;
                //case "Location":
                //    return new Location(data);
                //    break;
                //case "User":
                //    return new User(data);
                //    break;
                case "Event":
                    return new Event(data);
                    break;
                //case "Story":
                //    return new Story(data);
                //    break;
                default:
                    //TODO: handle error
                    console.log("E: '"+objName+"' is not a valid object name in GenericManager")
                    break;
            }
        };
        this._pool = {};
        this._retrieveInstance = function (id, data) {
            var instance = this._pool[id];

            if (instance) {
                instance.setData(data);
            } else {
                instance = new Hushtag(data);
                this._pool[id] = instance;
            }

            return instance;
        };
        this._search = function (id) {
            return this._pool[id];
        };
        this._load = function (id, deferred) {
            var scope = this;

            $http.get('ourserver/books/' + id)
                .success(function (data) {
                    var instance = scope._retrieveInstance(data.id, data);
                    deferred.resolve(instance);
                })
                .error(function () {
                    deferred.reject();
                });
        };
        /* Public Methods */
        this.get = function (id) {
            var deferred = $q.defer();
            var instance = this._search(id);
            if (instance) {
                deferred.resolve(instance);
            } else {
                this._load(id, deferred);
            }
            return deferred.promise;
        };
        this.loadAll = function () {
            var deferred = $q.defer();
            var scope = this;
            //$http.get('ourserver/books')
            $http.get('http://localhost:8100/data/'+objName.toLowerCase()+'.json')
                .success(function (results) {
                    console.log(results);
                    var out = [];
                    results.forEach(function (data) {
                        var instance = scope._retrieveInstance(data.id, data);
                        out.push(instance);
                    });

                    deferred.resolve(out);
                })
                .error(function () {
                    console.log("couldn't retrieve data for "+objName);
                    deferred.reject();
                });
            return deferred.promise;
        };
        this.set = function (data) {
            var scope = this;
            var instance = this._search(data.id);
            if (instance) {
                instance.setData(data);
            } else {
                instance = scope._retrieveInstance(data);
            }
            return instance;
        };

    };

}]);