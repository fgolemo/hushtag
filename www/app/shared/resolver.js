sharedModule.service('Resolver', ['EventsManager', 'LocationsManager', 'CommentsManager', 'UsersManager', 'HushtagsManager', 'StoriesManager',
    function (EventsManager, LocationsManager, CommentsManager, UsersManager, HushtagsManager, StoriesManager) {
        this._managers = {
            "Hushtag": HushtagsManager,
            "Story": StoriesManager,
            "Event": EventsManager,
            "Location": LocationsManager,
            "Comment": CommentsManager,
            "User": UsersManager
            //TODO: add other managers
        };
        this.getManager = function (name) {
            if (name in this._managers) {
                return this._managers[name];
            } else {
                return false;
            }
        };
        this.loadRefs = function (obj, refs, recursive, cb) {
            if (refs != null) {
                var out = [];
                for (var j in refs) {
                    for (var i in obj.refs) {
                        if (obj.refs[i].attribute == refs[j]) {
                            out.push(obj.refs[i]);
                        }
                    }
                }
                refs = out;
            } else {
                refs = obj.refs;
            }
            for (i in refs) {
                var ref = refs[i];
                if (ref.quantity == "one") {
                    this._resolveSingle(obj, ref, recursive, cb);
                } else {
                    this._resolveMulti(obj, ref, recursive, cb);
                }
            }
        };
        this._resolveSingle = function (obj, ref, recursive, cb) {
            //TODO: check if ref.type is actually among the managers, otherwise throw exeption
            var self = this;
            if (obj[ref.attribute] && obj[ref.attribute] != null && obj[ref.attribute] != "") {
                this._managers[ref.type].m.get(obj[ref.attribute]).then(function (result) {
                    obj[ref.attribute + "Resolved"] = result;
                    if (recursive) {
                        self.loadRefs(result, null, false, cb); //TODO: handle recursion better, like add a depth counter
                    } else {
                        if (cb) {
                            cb(ref.attribute + "Resolved");
                        }
                    }
                });
            }
        };
        this._resolveMulti = function (obj, ref, recursive, cb) {
            var self = this;
            this._managers[ref.type].m.getAll(obj[ref.attribute]).then(function (result) {
                obj[ref.attribute + "Resolved"] = result;
                if (recursive) {
                    for (var i in result) {
                        self.loadRefs(result[i], null, true, cb);
                    }
                } else {
                    if (cb) {
                        cb(ref.attribute + "Resolved");
                    }
                }
            });
        };
    }]);