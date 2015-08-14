usersModule.service('UsersManager', ['Manager', function (Manager) {
    this.m = new Manager("User");
}]);