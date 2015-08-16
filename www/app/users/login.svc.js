usersModule.service('Login', ['$http', 'User', 'Settings', function ($http, User, Settings) {
    this.user = null;
    this.isLoggedIn = function() {
        return !!this.user;
    };
    this.sendLogin = function(data) {
        var self = this;
        $http.post(Settings.database + "login", data)
            .then(function (response) { // when response is available
                if (response.data.status && response.data.status == "success") {
                    self.user = response.data.obj;
                    //TODO: store credentials for later
                } else {
                    console.dir(response.data);
                }
            }, function (response) { // when there was an error
                console.log("couldn't log in with data:");
                console.dir(data);
                console.log("server response:")
                console.dir(response);
            }
        );
    };

    this.sendSignup = function(data) {
        $http.post(Settings.database + "signup", data)
            .then(function (response) { // when response is available
                console.log("got positive signup response:");
                console.dir(response);
            }, function (response) { // when there was an error
                console.log("couldn't sign up with data:");
                console.dir(data);
                console.log("server response:")
                console.dir(response);
            }
        );
    };

    //TODO: handle signup
}]);