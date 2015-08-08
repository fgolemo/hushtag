sharedModule.service('Resolver', ['EventsManager', 'LocationsManager', function (EventsManager, LocationsManager) {
    this._managers = {
        "Event": EventsManager,
        "Location": LocationsManager//,
        //TODO: add other managers
    };
    this.loadRefs = function(obj) {
        for (var i in obj.refs) {
            ref = obj.refs[i];
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
        //TODO: implement
    };
}]);