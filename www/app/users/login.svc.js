usersModule.service('Login', ['$http', 'User', 'Settings', 'Localstorage', function ($http, User, Settings, Localstorage) {
    this.user = null;
    this.isLoggedIn = function () {
        return (this.user != null && JSON.stringify(this.user) != "{}");
    };

    this.sendLogin = function (data, errorCB) {
        var self = this;
        $http.post(Settings.database + "login", data)
            .then(function (response) {
                self.responseHandlerLogin(response, errorCB, data);
            }, function (response) { // when there was an error
                console.log("couldn't log in with data:");
                console.dir(data);
                console.log("server response:")
                console.dir(response);
            }
        );
    };


    this.responseHandlerLogin = function (response, errorCB, data) {
        if (response.data.status && response.data.status == "success") {
            this.user = response.data.obj;
            Localstorage.setObject('user', data);
            this.getRep();
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
                self.responseHandlerLogin(response, errorCB, data);
            }, function (response) { // when there was an error
                self.errorHandler("couldn't sign up with data:", response);
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

    this.getRep = function () {
        if (!this.user || JSON.stringify(this.user) == '{}') {
            return false;
        }
        var self = this;
        $http.get(Settings.database + "user/"+this.user.id+"/rep")
            .then(function (response) {
                if (response.data.status && response.data.status == "success") {
                    self.user.rep = response.data.obj;
                } else {
                    self.errorHandler("couldn't get rep for user:", response);
                }
            }, function (response) { // when there was an error
                self.errorHandler("couldn't get rep for user:", response);
            }
        );
    };

    this.errorHandler = function(errorMsg, response) {
        console.log(errorMsg);
        console.dir(self.user);
        console.log("server response:");
        console.dir(response);
    };

    this.getUserToken = function() {
        if (!this.isLoggedIn()) {
            return false;
        }
        return {
            user: this.user.id,
            token: this.user.token
        }
    };

    var storedAuth = Localstorage.getObject('user');
    if (JSON.stringify(storedAuth) != '{}') {
        this.sendLogin(storedAuth, function (error) {
            console.log("ERROR: problem with auto login: " + error);
        });
    }

}]);