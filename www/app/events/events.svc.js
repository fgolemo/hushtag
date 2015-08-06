eventsModule.factory('Event', [function () {
    function Event(data) {
        if (data) {
            this.setData(data);
        }
    }
    Event.prototype = {
        id: "",     // unique identifier, either int (unlikely) or string.
        start: new Date(),  // Date for start
        start_time: new Date(),// Time for start
        end: new Date(),    // Date for end
        end_time: new Date(), // Time for end
        invite_only: false, // boolean, if it's public or not
        invitees: [],       // list of IDs of users who are invited or signed up
        description: "",    // medium string, description of the event, can be multiline
        location: "",       // ID of a location
        organizer: "",      // either string (if the event wasn't created by a user) or user ID
        //genre: "",    // nope, instead we make the users chose from a list of genre tags
        pics: [],   // list of URLs of pics, ["/img/amphetamine1.png", "/img/amphetamine2.png"]
        comments: [],// list of IDs of comments on this entry, [88, 23, 189]
        tags: [],   // list of IDs of tags on this entry, [77, 433, 182]
        flags: [],  // list of IDs of reports/flags, [1123, 1883, 1992, 1221]

        setData: function (data) {
            angular.extend(this, data);
        },
        delete: function () {
            //$http.delete('ourserver/books/' + bookId);
        },
        update: function () {
            //$http.put('ourserver/books/' + bookId, this);
        }
        //getImageUrl: function(width, height) {
        //    return 'our/image/service/' + this.book.id + '/width/height';
        //},
        //isAvailable: function() {
        //    if (!this.book.stores || this.book.stores.length === 0) {
        //        return false;
        //    }
        //    return this.book.stores.some(function(store) {
        //        return store.quantity > 0;
        //    });
        //}
    };
    return Event;
}]);