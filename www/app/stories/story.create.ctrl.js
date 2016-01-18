storiesModule
    .controller('StoryCreateCtrl', function ($scope, Tags, Story, StoriesManager, Helper, Login, $stateParams) {
        Tags.get(true);
        var hushtagID = $stateParams.hushtag;
        $scope.taskname = "Create Story";
        $scope.obj = new Story();
        $scope.obj.hushtag = hushtagID;

        $scope.datepickerObject = {
            titleLabel: 'Taken On',  //Optional
            closeLabel: 'Close',  //Optional
            setLabel: '',  //Optional
            setButtonType : 'button-royal',  //Optional
            inputDate: new Date(),  //Optional
            mondayFirst: true,  //Optional
            templateType: 'popup', //Optional
            modalHeaderColor: 'bar-royal', //Optional
            modalFooterColor: 'bar-royal', //Optional
            from: new Date(2015, 1, 1), //Optional
            to: new Date(),  //Optional
            callback: function (val) {  //Mandatory
                datePickerCallback(val);
            },
            closeOnSelect: true
        };

        var datePickerCallback = function (val) {
            if (typeof(val) === 'undefined') {
                $scope.obj.createdDate = null;
            } else {
                $scope.obj.createdDate = val;
            }
        };


        $scope.update = function () {
            if ($scope.obj.postUser && Login.isLoggedIn()) {
                $scope.obj.owner = Login.user.id;
            }
            StoriesManager.m.create($scope.obj).then(function (response) {
                console.log( "response obj:");
                console.dir(response.obj);
                var customPath = "/app/home/stories/"+ response.obj.hushtag+ "/" + response.obj.id;
                Helper.updateCallback("story", response, customPath);
            });
        };
    })
;