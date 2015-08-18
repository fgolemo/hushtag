usersModule.service('Login', ['$http', 'User', 'Settings', 'Localstorage', function ($http, User, Settings, Localstorage) {
    this.user = null;
    this.isLoggedIn = function () {
        return !!this.user;
    };
    this.sendLogin = function (data, errorCB) {
        var self = this;
        $http.post(Settings.database + "login", data)
            .then(function (response) {
                self.responseHandler(response, errorCB, data);
            }, function (response) { // when there was an error
                console.log("couldn't log in with data:");
                console.dir(data);
                console.log("server response:")
                console.dir(response);
            }
        );
    };

    this.responseHandler = function (response, errorCB, data) {
        if (response.data.status && response.data.status == "success") {
            this.user = response.data.obj;
            Localstorage.setObject('user', data);
            //TODO: store credentials for later
        } else if (response.data.status && response.data.status == "fail") {
            errorCB(response.data.msg);
        } else {
            //TODO: can this ever happen? If not remove block
        }
    };

    this.sendSignup = function (data, errorCB) {
        var self = this;
        $http.post(Settings.database + "signup", data)
            .then(function (response) {
                self.responseHandler(response, errorCB, data);
            }, function (response) { // when there was an error
                console.log("couldn't sign up with data:");
                console.dir(data);
                console.log("server response:")
                console.dir(response);
            }
        );
    };

    this.logout = function () {
        this.user = null;
        Localstorage.remove('user');
    };

    this.getUserAvatar = function () {
        if (this.user && this.user.avatar) {
            return this.user.avatar;
        } else {
            return Settings.defaultAvatar;
        }
    };

    var storedAuth = Localstorage.getObject('user');
    if (JSON.stringify(storedAuth) != '{}') {
        this.sendLogin(storedAuth, function (error) {
            console.log("ERROR: problem with auto login: " + error);
        });
    }

}]);