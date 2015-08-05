angular.module('hushtag', [
    'ionic',
    //'ui.bootstrap',
    'angularMoment',
    'hushtag.services',
    'hushtag.controllers'
])

    .run(function ($ionicPlatform, amMoment) {
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
        amMoment.changeLocale('en-gb'); //TODO: this is very temporary and should be done automatically later on
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/app.html",
                controller: 'AppCtrl'
            })

            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html"
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

            .state('app.home.events', {
                url: "/events",
                views: {
                    'events': {
                        templateUrl: "templates/events.html",
                        controller: 'EventsCtrl'
                    }
                }
            })

            .state('app.home.hushtags', {
                url: "/hushtags",
                views: {
                    'hushtags': {
                        templateUrl: "templates/hushtags.html",
                        controller: 'HushtagsCtrl'
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
                        templateUrl: "templates/profile.html"
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
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home/news');
    });
