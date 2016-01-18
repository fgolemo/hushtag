sharedModule.service('Helper', ['$ionicPopup', '$location', function ($ionicPopup, $location) {
    this.updateCallback = function (type, response, customPath) {
        if (response.status == "success") {
            $ionicPopup.alert({
                title: "Done",
                template: type.capitalize() + " successfully updated"
            }).then(function () {
                if (customPath) {
                    $location.path(customPath);
                } else {
                    $location.path("/app/home/" + type + "s/" + response.obj.id);
                }

            });
        } else {
            $ionicPopup.alert({
                title: "That didn't work",
                template: response.msg
            });
        }
    };

    this.addGlobalHelpers = function () {

    };

    this.compare = function (a, b, property) {
        if (a[property] < b[property])
            return -1;
        if (a[property] > b[property])
            return 1;
        return 0;
    };

    this.nameComparator = function (a, b) {
        //return this.compare(a, b, "name"); //doesn't work for some ridiculous reason
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    };

    this.firstLetter = function(name) {
        return name && name.charAt(0).toUpperCase();
    };

}]);


String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

