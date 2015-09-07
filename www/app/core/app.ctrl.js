coreModule.controller('AppCtrl', ['$scope', 'Login', function ($scope, Login) {
    // Login module is here for auto-login if the user stored some credentials

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.login = Login;
}])

;
