sharedModule.directive('buttonHide', function ($rootScope, Login, Settings) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $rootScope.$on('$ionicView.beforeEnter', function (ev, viewData) {
                    var name = $attrs.buttonHide;
                    if (!Login.isLoggedIn()) {
                        $element.addClass('hide');
                    } else {
                        var repID = 0;
                        switch (name) {
                            case "events":
                                repID = 0;
                                break;
                            case "hushtags":
                                repID = 1;
                                break;
                            case "locations":
                                repID = 2;
                                break;
                        }
                        if (Login.user.rep[repID] >= Settings.rep.editOwn) {
                            $element.removeClass('hide');
                        } else {
                            $element.addClass('hide');
                        }
                    }
                });
            }
        }
    }
);