storiesModule.service('StoriesManager', ['Manager', function (Manager) {
    this.m = new Manager("Story");
}]);