storiesModule.factory('Story', ["moment", function (moment) {
    function Story(data) {
        if (data) {
            this.setData(data);
            this.unpack();
        }
    }

    Story.prototype = {
        id: "",     // unique identifier, either int (unlikely) or string.
        owner: "",      // either string (if the event wasn't created by a user) or user ID
        created: "", // timestamp
        hushtag: "", // id of a Hushtag
        dosage: "", // short string, how much was consumed
        effect_positive: "", // long text
        effect_negative: "", // long text
        effect_duration: "", // short string
        event: "", // event ID (optional)
        pics: [],   // list of URLs of pics, ["/img/amphetamine1.png", "/img/amphetamine2.png"]
        comments: [],// list of IDs of comments on this entry, [88, 23, 189]
        tags: [],   // list of IDs of tags on this entry, [77, 433, 182]
        flags: [],  // list of IDs of reports/flags, [1123, 1883, 1992, 1221]
        upvotes: 0,   // integer of upvotes
        downvotes: 0,   // integer of downvotes
        hasVoted: false,// boolean, indicator if the user himself has voted
        refs: [
            {
                attribute: "hushtag",
                type: "Hushtag",
                quantity: "one"
            },
            {
                attribute: "event",
                type: "Event",
                quantity: "one"
            }
        ],

        setData: function (data) {
            angular.extend(this, data);
            this.unpack();
        },
        unpack: function () {
            this.datetime = moment(this.datetime);
            this.datetimeDate = this.datetime.toDate();
        },
        pack: function () {
            this.datetime = moment(this.datetimeDate).format();
        }
    };
    return Story;
}]);