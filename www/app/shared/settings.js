sharedModule.service('Settings', [function () {
    this.loadingConf = {
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    };
    //this.database = "http://quiet-sea-4655.herokuapp.com/"; //production
    this.database = "http://localhost:5000/"; //test
    this.defaultAvatar = "/img/ht-logo-100px.png";
}]);