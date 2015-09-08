sharedModule.service('Helper', ['$ionicPopup', '$location', function ($ionicPopup, $location) {
    this.updateCallback = function(type, response) {
        if (response.status == "success") {
            $ionicPopup.alert({
                title: "Done",
                template: type.capitalize()+" successfully updated"
            }).then(function() {
                $location.path("/app/home/"+type+"s/"+response.obj.id);
            });
        } else {
            $ionicPopup.alert({
                title: "That didn't work",
                template: response.msg
            });
        }
    };

    this.addGlobalHelpers = function() {

    }

}]);


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

