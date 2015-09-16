helpModule
    .controller('HelpCtrl',
    ["$scope", "$cordovaEmailComposer", "Settings", "Urlify", "$ionicPlatform",
        function ($scope, $cordovaEmailComposer, Settings, Urlify, $ionicPlatform) {
            $scope.hrefSupport = Urlify.mailto(Settings.mails.support);
            $scope.hrefFeedback = Urlify.mailto(Settings.mails.feedback);
            $scope.sendSupportMail = function() {

            };
            $scope.sendFeedbackMail = function() {

            };
            $ionicPlatform.ready(function () {
                try {
                    $cordovaEmailComposer.isAvailable().then(function() {
                        $scope.sendSupportMail = function() {
                            event.preventDefault();
                            $cordovaEmailComposer.open(Settings.mails.support).then(null, angular.noop);
                        };
                        $scope.sendFeedbackMail = function() {
                            event.preventDefault();
                            $cordovaEmailComposer.open(Settings.mails.feedback).then(null, angular.noop);
                        };
                    }, function() {
                        //plugin is not available
                    });
                } catch (err) {
                    console.log("ERROR: cordova not working for opening mail app");
                }
            });

        }
    ]
);