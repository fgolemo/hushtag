votesModule.service('Votes', ['$q', 'Login', 'Settings', '$http',
    function ($q, Login, Settings, $http) {
        this.hasVoted = function (type, id) {
            if (!Login.isLoggedIn()) {
                return null;
            }
            var deferred = $q.defer();
            var self = this;
            var postData = this._createPost(type, id, false);
            $http.post(Settings.database + 'votes/hasVoted', postData)
                .then(function (response) { // when response is available
                    //TODO: implement
                    console.log("got hasVoted response");
                    console.dir(response);
                    deferred.resolve(out);
                }, function (response) { // when there was an error
                    //TODO: implement
                    console.log("couldn't retrieve hasVoted for: ");
                    console.dir(response);
                    deferred.reject();
                }
            );

            return deferred.promise;
        };

        this._createPost = function (type, id, auth) {
            var out = {
                obj: {
                    type: type,
                    id: id
                }
            };
            if (auth) {
                out.ut = Login.getUserToken();
            }
            return out;
        };
    }]);