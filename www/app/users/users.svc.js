usersModule.factory('User', [function () {
    function User(data) {
        if (data) {
            this.setData(data);
        }
    }

    User.prototype = {
        id: "", // integer, identifier
        name: "", // string, username, limit: 20 chars
        password: "", // string, clear text password (never sent from the server)
        password_hash: "", // string, hashed version of the password (for transmission)
        avatar: "", // string, path tho the profile pic
        //profile_text,
        //realidentity
        //banned_reason
        created: "", // Date object
        lastloggedin: "", // Date object
        contact: "", // long string, optional for real people
        refs: [],

        setData: function (data) {
            angular.extend(this, data);
        },
        becomeAnonymous: function () {
            this.id = 0;
            this.name = "Anoymous";
            this.avatar = "/img/ht-logo-100px.png";
        }
    };
    return User;
}]);