usersModule
    .controller('UserInfoCtrl', function ($scope, UsersManager) {
        UsersManager.m.get(1).then(function (user) {
            $scope.anon = user;
        });
    })
;