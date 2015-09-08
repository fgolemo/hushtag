sharedModule.factory('Manager',
    ['$http', '$q', 'Hushtag', 'Event', 'Location', 'User', 'Settings', 'Login', 'Comment',
        function ($http, $q, Hushtag, Event, Location, User, Settings, Login, Comment) {
            return function (objName) {
                this.server = Settings.database;
                this._objCreator = function (data) {
                    switch (objName) {
                        case "Hushtag":
                            return new Hushtag(data);
                            break;
                        //case "HushtagUse":
                        //    return new Hushtag(data);
                        //    break;
                        case "Comment":
                            return new Comment(data);
                            break;
                        //case "Tag":
                        //    return new Tag(data);
                        //    break;
                        //case "Pic":
                        //    return new Pic(data);
                        //    break;
                        case "Location":
                            return new Location(data);
                            break;
                        case "User":
                            return new User(data);
                            break;
                        case "Event":
                            return new Event(data);
                            break;
                        //case "Story":
                        //    return new Story(data);
                        //    break;
                        default:
                            //TODO: handle error
                            console.log("E: '" + objName + "' is not a valid object name in GenericManager")
                            break;
                    }
                };
                this._pool = {};
                this._retrieveInstance = function (id, data) {
                    var instance = this._pool[id];

                    if (instance) {
                        instance.setData(data);
                    } else {
                        instance = this._objCreator(data);
                        this._pool[id] = instance;
                    }

                    return instance;
                };
                this._search = function (id) {
                    return this._pool[id];
                };
                this._load = function (id, deferred) {
                    var scope = this;
                    $http.get(this.server + objName.toLowerCase() + '/' + id)
                        .success(function (data) {
                            var instance = scope._retrieveInstance(data.id, data);
                            deferred.resolve(instance);
                        })
                        .error(function () {
                            deferred.reject();
                        });
                };
                this._loadSync = function (id, cb) {
                    var scope = this;
                    $http.get(this.server + objName.toLowerCase() + '/' + id)
                        .success(function (data) {
                            var instance = scope._retrieveInstance(data.id, data);
                            cb(instance);
                        })
                        .error(function () {
                            cb(null);
                        });
                };
                /* Public Methods */
                this.get = function (id, force) {
                    var deferred = $q.defer();
                    var instance = this._search(id);
                    if (instance && (!force || force == null)) {
                        deferred.resolve(instance);
                    } else {
                        this._load(id, deferred);
                    }
                    return deferred.promise;
                };
                this.getAll = function (ids) {
                    var deferred = $q.defer();
                    var out = [];
                    var counterResolved = 0;
                    var counterTotal = ids.length;
                    for (var i in ids) {
                        var id = ids[i];
                        var instance = this._search(id);
                        if (instance) {
                            if (instance != null) {
                                out.push(instance);
                            }
                            counterResolved += 1;
                            if (counterResolved == counterTotal) {
                                deferred.resolve(out);
                            }
                        } else {
                            this._loadSync(id, function (instance) {
                                if (instance != null) {
                                    out.push(instance);
                                }
                                counterResolved += 1;
                                if (counterResolved == counterTotal) {
                                    deferred.resolve(out);
                                }
                            });
                        }
                    }
                    return deferred.promise;
                };
                this.loadAll = function (force) {
                    //TODO: add caching here - if !force load from cache
                    var deferred = $q.defer();
                    var scope = this;
                    $http.get(this.server + objName.toLowerCase() + 's') // 's' for plural... as in "get all of them"
                        .then(function (response) { // when response is available
                            var out = [];
                            response.data.forEach(function (data) {
                                var instance = scope._retrieveInstance(data.id, data);
                                out.push(instance);
                            });
                            deferred.resolve(out);
                        }, function (response) { // when there was an error
                            console.log("couldn't retrieve data for " + objName);
                            console.dir(response);
                            deferred.reject();
                        }
                    );

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
                this.create = function (instance) {
                    var deferred = $q.defer();
                    var userToken = Login.getUserToken();
                    if (!userToken) {
                        console.log("ERROR: usertoken not found");
                        deferred.reject();
                    }
                    var scope = this;
                    instance.pack();
                    var url = this.server + objName.toLowerCase() + 's';
                    var obj = {obj: instance, ut: userToken};
                    $http.post(url, obj)
                        .then(function (response) { // when response is available
                            if (response.data && response.data.status=="success" && response.data.obj) {
                                scope._retrieveInstance(response.data.obj.id, response.data.obj);
                            }
                            deferred.resolve(response.data);
                        }, function (response) { // when there was an error
                            console.log("couldn't post data for " + objName);
                            console.dir(response);
                            deferred.reject();
                        }
                    );
                    return deferred.promise;
                };
                this.update = function (data) {
                    var deferred = $q.defer();
                    var userToken = Login.getUserToken();
                    if (!userToken) {
                        console.log("ERROR: usertoken not found");
                        deferred.reject();
                    }
                    var scope = this;
                    var instance = this._search(data.id);
                    if (instance) {
                        instance.pack();
                        var url = this.server + objName.toLowerCase() + '/' + data.id;
                        var obj = {obj: instance, ut: userToken};
                        $http.put(url, obj)
                            .then(function (response) { // when response is available
                                deferred.resolve(response.data);
                            }, function (response) { // when there was an error
                                console.log("couldn't put data for " + objName);
                                console.dir(response);
                                deferred.reject();
                            }
                        );
                    }
                    return deferred.promise;
                };

            };

        }]);