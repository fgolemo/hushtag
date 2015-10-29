storiesModule
    .controller('StoryInfoCtrl', function ($scope, StoriesManager, $stateParams, Resolver, moment) {
        var objID = $stateParams.story;
        //var objID = $stateParams.hushtag;
        var loadobj = function(forced, cb) {
            StoriesManager.m.get(objID, forced).then(function (obj) {
                Resolver.loadRefs(obj, null, false, function(resolvedName){
                    if (resolvedName == "eventResolved") { //load location for event
                        Resolver.loadRefs(obj.eventResolved, null, false);
                    }
                    if (resolvedName == "commentsResolved") { //load usernames for comments
                        Resolver.loadRefs(obj.commentsResolved, null, false);
                    }
                });
                $scope.obj = obj;
                $scope.$broadcast("objLoaded");
                StoriesManager.m.getComments(objID);
                if (cb) {
                    cb();
                }
            });
        };
        loadobj(false);
    })
;