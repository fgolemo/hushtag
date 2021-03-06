angular.module('hushtag', [
    'ngCordova',
    'ionic',
    //'ui.bootstrap',
    'hushtag.shared.httpPostFix',
    'hushtag.shared.urlify',
    'angularMoment',
    'monospaced.elastic',
    'ionic-datepicker',
    'hushtag.shared',
    'hushtag.tags',
    'hushtag.core',
    'hushtag.news',
    'hushtag.events',
    'hushtag.locations',
    'hushtag.pics',
    'hushtag.users',
    'hushtag.comments',
    'hushtag.votes',
    'hushtag.help',
    'hushtag.hushtags',
    'hushtag.stories',
    'ionic-material'
])

    .run(function ($ionicPlatform, amMoment, $ionicLoading, Settings, $rootScope, Helper) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        Helper.addGlobalHelpers();

        amMoment.changeLocale('en-gb'); //TODO: this is very temporary and should be done automatically later on

        $rootScope.$on('loading:show', function() {
            $ionicLoading.show(Settings.loadingConf)
        });

        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide()
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, naviCreatorProvider) {
        $httpProvider.interceptors.push(function($rootScope) {
            return {
                request: function(config) {
                    $rootScope.$broadcast('loading:show');
                    return config
                },
                response: function(response) {
                    $rootScope.$broadcast('loading:hide');
                    return response
                }
            }
        });

        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                //cache: false, // this doesn't do anything if activated
                templateUrl: "app/core/app.html",
                controller: 'AppCtrl'
            })

            .state('app.home', {
                url: "/home",
                cache: false, // only this makes sure the tabs are refreshed
                views: {
                    'menuContent': {
                        templateUrl: "app/core/home.html"
                    }
                }
            })

            .state('app.home.news', {
                url: "/news",
                views: {
                    'news': {
                        templateUrl: "app/news/news.html",
                        controller: 'NewsCtrl'
                    }
                }
            })


            .state('app.home.pic', {
                url: "/pic/:pic",
                //cache: false,
                views: {
                    'events': {
                        templateUrl: "app/pics/pic.info.html",
                        controller: 'PicInfoCtrl'
                    }
                }
            })


            .state('app.locations', {
                url: "/locations",
                views: {
                    'menuContent': {
                        templateUrl: "templates/locations.html"
                    }
                }
            })

            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "app/users/user.info.html",
                        controller: 'UserInfoCtrl'
                    }
                }
            })

            .state('app.help', {
                url: "/help",
                views: {
                    'menuContent': {
                        templateUrl: "app/help/help.html",
                        controller: 'HelpCtrl'
                    }
                }
            })

            .state('app.help-rules', {
                url: "/help/rules",
                views: {
                    'menuContent': {
                        templateUrl: "app/help/rules.html"
                    }
                }
            })

            .state('app.help-tc', {
                url: "/help/terms-conditions",
                views: {
                    'menuContent': {
                        templateUrl: "app/help/tc.html"
                    }
                }
            })

            .state('app.settings', {
                url: "/settings",
                views: {
                    'menuContent': {
                        templateUrl: "templates/settings.html"
                    }
                }
            })

            .state('app.home.stories', {
                url: "/stories/:hushtag?",
                views: {
                    'hushtags': {
                        templateUrl: "app/stories/stories.html",
                        controller: 'StoriesCtrl'
                    }
                }
            })
            .state('app.home.story-create', {
                url: "/stories/:hushtag/create",
                views: {
                    'hushtags': {
                        templateUrl: "app/stories/story.edit.html",
                        controller: 'StoryCreateCtrl'
                    }
                }
            })
            .state('app.home.story', {
                url: "/stories/:hushtag/:story",
                views: {
                    'hushtags': {
                        templateUrl: "app/stories/story.info.html",
                        controller: 'StoryInfoCtrl'
                    }
                }
            })
            .state('app.home.story-edit', {
                url: "/stories/:hushtag/:story/edit",
                views: {
                    'hushtags': {
                        templateUrl: "app/stories/story.edit.html",
                        controller: 'StoryEditCtrl'
                    }
                }
            })
        ;

        naviCreatorProvider.addNaviFor('event', 'app.home', $stateProvider);
        naviCreatorProvider.addNaviFor('hushtag', 'app.home', $stateProvider);


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home/news');
    });
