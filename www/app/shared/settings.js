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
    this.rep = {
        create: 20,
        edit: 100
    };
    this.hushtagInfoBoxLimit = 40;
    this.mails = {
        support: {
            to: 'support@hushtag.co.uk',
            subject: 'Support request for Hushtag app',
            body: 'Hey Hushtag team,\n\nHow are you doing?\n\nI was wondering if you could help me with this issue:\n\n'
        },
        feedback: {
            to: 'team@hushtag.co.uk',
            subject: 'Hushtag feedback',
            body: 'Hey Hushtag team,\n\nI just wanted to let you know:\n\n'
        }
    };
}]);
