usersModule
    .controller('UserInfoCtrl', function ($scope, UsersManager, Login, $ionicPopup) {
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
        $scope.sendLogin = function() {
            Login.sendLogin(getData(), function(badResponse) {
                var alertPopup = $ionicPopup.alert({
                    title: "That didn't work",
                    template: badResponse
                });
                //alertPopup.then(function(res) {
                //    console.log('Thank you for not eating my delicious ice cream cone');
                //});
            });
        };
        $scope.sendSignup = function() {
            Login.sendSignup(getData());
        };
    })
;