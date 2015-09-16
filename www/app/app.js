angular.module('hushtag', [
    'ngCordova',
    'ionic',
    //'ui.bootstrap',
    'hushtag.shared.httpPostFix',
    'hushtag.shared.urlify',
    'angularMoment',
    'monospaced.elastic',
    'hushtag.services',
    'hushtag.controllers',
    'hushtag.shared',
    'hushtag.core',
    'hushtag.events',
    'hushtag.locations',
    'hushtag.pics',
    'hushtag.users',
    'hushtag.comments',
    'hushtag.votes',
    'hushtag.help',
    'hushtag.hushtags',
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
                templateUrl: "app/core/app.html",
                controller: 'AppCtrl'
            })

            .state('app.home', {
                url: "/home",
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
                        templateUrl: "templates/news.html",
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

            .state('app.settings', {
                url: "/settings",
                views: {
                    'menuContent': {
                        templateUrl: "templates/settings.html"
                    }
                }
            })

            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlists.html",
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            });

        naviCreatorProvider.addNaviFor('event', 'app.home', $stateProvider);
        naviCreatorProvider.addNaviFor('hushtag', 'app.home', $stateProvider);

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home/news');
    });
