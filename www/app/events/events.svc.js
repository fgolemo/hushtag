eventsModule.factory('Event', ["moment", function (moment) {
    function Event(data) {
        if (data) {
            this.setData(data);
            this.unpack();
        }
    }
    Event.prototype = {
        id: "",     // unique identifier, either int (unlikely) or string.
        start: new Date(),  // Date for start
        //start_time: new Date(),// Time for start
        end: new Date(),    // Date for end
        //end_time: new Date(), // Time for end
        invite_only: false, // boolean, if it's public or not
        invitees: [],       // list of IDs of users who are invited or signed up
        description: "",    // medium string, description of the event, can be multiline
        location: "",       // ID of a location
        locationResolved: "",// actual location
        owner: "",      // either string (if the event wasn't created by a user) or user ID
        //genre: "",    // nope, instead we make the users chose from a list of genre tags
        pics: [],   // list of URLs of pics, ["/img/amphetamine1.png", "/img/amphetamine2.png"]
        comments: [],// list of IDs of comments on this entry, [88, 23, 189]
        tags: [],   // list of IDs of tags on this entry, [77, 433, 182]
        flags: [],  // list of IDs of reports/flags, [1123, 1883, 1992, 1221]
        upvotes: 0,   // integer of upvotes
        downvotes: 0,   // integer of downvotes
        hasVoted: false,// boolean, indicator if the user himself has voted
        refs: [
            {
                attribute: "location",
                type: "Location",
                quantity: "one"
            },
            {
                attribute: "comments",
                type: "Comment",
                quantity: "many"
            }
        ],

        setData: function (data) {
            angular.extend(this, data);
            this.unpack();
        },
        unpack: function () {
            this.start = moment(this.start);
            this.hasEnd = false;
            if (this.end != null && this.end != "null") {
                this.end = moment(this.end);
                this.endDate = this.end.toDate();
                this.hasEnd = true;
            }
            this.startDate = this.start.toDate();
        },
        pack: function () {
            this.start = moment(this.startDate).format();
            this.end = moment(this.endDate).format();
            if (!this.hasEnd) {
                this.end = null;
            }
        }
    };
    return Event;
}]);