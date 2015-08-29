commentsModule.factory('Comment', ["moment", function (moment) {
    function Comment(data) {
        if (data) {
            this.setData(data);
            this.unpack();
        }
    }
    Comment.prototype = {
        id: "",     // unique identifier, either int (unlikely) or string.
        content: "",    // long string, actual content of the comment
        created: new Date(), // date obj of creation of the comment
        votes: [],      // integer of votes
        hasVoted: false,// boolean, indicator if the user himself has voted
        owner: "",      // user ID
        flags: [],  // list of IDs of reports/flags, [1123, 1883, 1992, 1221]
        refs: [

        ],

        setData: function (data) {
            angular.extend(this, data);
            this.unpack();
        },
        unpack: function () {
            this.created = moment(this.created);
            this.createdDate = this.created.toDate();
        },
        pack: function () {
            this.created = moment(this.createdDate).format();
        }
    };
    return Comment;
}]);