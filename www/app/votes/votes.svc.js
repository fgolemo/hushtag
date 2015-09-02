votesModule.service('Votes', ['$q', 'Login', 'Settings', '$http',
    function ($q, Login, Settings, $http) {
        this.hasVoted = function (type, id) {
            if (!Login.isLoggedIn()) {
                return null;
            }
            var deferred = $q.defer();
            var self = this;
            var postData = this._createPost(type, id);
            $http.post(Settings.database + 'votes/hasVoted', postData)
                .then(function (response) { // when response is available
                    deferred.resolve(response);
                }, function (response) { // when there was an error
                    console.log("couldn't retrieve hasVoted for: ");
                    console.dir(postData);
                    console.dir(response);
                    deferred.reject();
                }
            );

            return deferred.promise;
        };

        this._createPost = function (type, id) {
            return {
                obj: {
                    type: type,
                    id: id
                },
                ut: Login.getUserToken()
            };
        };
    }]);