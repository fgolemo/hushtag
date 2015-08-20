usersModule
    .controller('UserInfoCtrl', function ($scope, UsersManager, Login, $ionicPopup, $ionicScrollDelegate) {
        //UsersManager.m.get(0).then(function (user) {
        //    $scope.anon = user;
        //});
        //TODO: load previous user credentials from localstorage
        $scope.login = Login;
        $scope.loginData = {};
        var SHA256 =  new Hashes.SHA256;
        var getData = function () {
            return {
                name: $scope.loginData.username,
                hash: SHA256.hex($scope.loginData.password)
            };
        };

        var badLoginPopup = function(badResponse) {
            var alertPopup = $ionicPopup.alert({
                title: "That didn't work",
                template: badResponse
            });
        };

        $scope.sendLogin = function() {
            Login.sendLogin(getData(), badLoginPopup);
        };
        $scope.sendSignup = function() {
            Login.sendSignup(getData(), badLoginPopup);
        };
        $scope.scrollTop = function() {
            $ionicScrollDelegate.scrollTop();
        };
    })
;