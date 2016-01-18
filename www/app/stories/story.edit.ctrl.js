storiesModule
    .controller('StoryEditCtrl', function ($scope, Tags, Story, StoriesManager, Helper, $stateParams) {
        Tags.get(true);
        $scope.taskname = "Edit Story";
        var objID = $stateParams.story;
        var hushtagID = $stateParams.hushtag;
        StoriesManager.m.get(objID).then(function(obj) {
            $scope.obj = obj;
            $scope.datepickerObject.inputDate = $scope.obj.createdDate;
        });


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
                //$scope.obj.createdDate = null; // just don't touch the original date if none is selected
            } else {
                $scope.obj.createdDate = val;
            }
        };


        $scope.update = function () {
            StoriesManager.m.update($scope.obj).then(function (response) {
                var customPath = "/app/home/stories/"+ response.obj.hushtag+"?refresh=1";
                Helper.updateCallback("story", response, customPath);
            });
        };
    })
;