eventsModule.service('EventsManager', ['Manager', function (Manager) {
    this.m = new Manager("Event");
}]);