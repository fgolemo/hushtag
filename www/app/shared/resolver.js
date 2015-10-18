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
        this.loadRefs = function (obj, refs, recursive) {
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
                    this._resolveSingle(obj, ref, recursive);
                } else {
                    this._resolveMulti(obj, ref, recursive);
                }
            }
        };
        this._resolveSingle = function (obj, ref, recursive) {
            //TODO: check if ref.type is actually among the managers, otherwise throw exeption
            var self = this;
            this._managers[ref.type].m.get(obj[ref.attribute]).then(function (result) {
                if (recursive) {
                    self.loadRefs(result, null, false); //TODO: handle recursion better, like add a depth counter
                }
                obj[ref.attribute + "Resolved"] = result;
            });
        };
        this._resolveMulti = function (obj, ref, recursive) {
            var self = this;
            this._managers[ref.type].m.getAll(obj[ref.attribute]).then(function (result) {
                if (recursive) {
                    for (var i in result) {
                        self.loadRefs(result[i], null, true);
                    }
                }
                obj[ref.attribute + "Resolved"] = result;
            });
        };
    }]);