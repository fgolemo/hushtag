usersModule.factory('User', [function () {
    function User(data) {
        if (data) {
            this.setData(data);
        }
    }
    User.prototype = {
        id: "",     // unique identifier, either int (unlikely) or string.
        description: "",    // medium string, description of the event, can be multiline
        pics: [],   // list of URLs of pics, ["/img/amphetamine1.png", "/img/amphetamine2.png"]
        comments: [],// list of IDs of comments on this entry, [88, 23, 189]
        tags: [],   // list of IDs of tags on this entry, [77, 433, 182]
        flags: [],  // list of IDs of reports/flags, [1123, 1883, 1992, 1221]
        refs: [
        ],

        setData: function (data) {
            angular.extend(this, data);
        },
        delete: function () {
            //$http.delete('ourserver/books/' + bookId);
        },
        update: function () {
            //$http.put('ourserver/books/' + bookId, this);
        }
    };
    return User;
}]);