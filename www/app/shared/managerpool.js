sharedModule.service('ManagerPool', ['EventsManager', 'LocationsManager', 'UsersManager', 'HushtagsManager', 'StoriesManager',
    function (EventsManager, LocationsManager, UsersManager, HushtagsManager, StoriesManager) {
        this._managers = {
            "Hushtag": HushtagsManager,
            "Story": StoriesManager,
            "Event": EventsManager,
            "Location": LocationsManager,
            "User": UsersManager
        };
        this.getManager = function (name) {
            if (name in this._managers) {
                return this._managers[name];
            } else {
                return false;
            }
        };
    }]);