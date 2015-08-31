sharedModule.service('Resolver', ['EventsManager', 'LocationsManager', 'CommentsManager', function (EventsManager, LocationsManager, CommentsManager) {
    this._managers = {
        "Event": EventsManager,
        "Location": LocationsManager,
        "Comment": CommentsManager
        //TODO: add other managers
    };
    this.loadRefs = function(obj, refs) {
        if (refs != null){
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
                this._resolveSingle(obj,ref);
            } else {
                this._resolveMulti(obj,ref);
            }
        }
    };
    this._resolveSingle = function(obj, ref) {
        //TODO: check if ref.type is actually among the managers, otherwise throw exeption
        this._managers[ref.type].m.get(obj[ref.attribute]).then(function(result) {
            obj[ref.attribute+"Resolved"] = result;
        });
    };
    this._resolveMulti = function(obj, ref) {
        this._managers[ref.type].m.getAll(obj[ref.attribute]).then(function(result) {
            obj[ref.attribute+"Resolved"] = result;
        });
    };
}]);