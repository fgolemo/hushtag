locationsModule.factory('Location', [function () {
    function Location(data) {
        if (data) {
            this.setData(data);
        }
    }
    Location.prototype = {
        id: "",     // unique identifier, either int (unlikely) or string.
        name: "",   // name of the establishment
        city: "",   // name of the establishment
        country: "",   // name of the establishment
        countryCode: "",   // name of the establishment
        description: "",    // medium string, description of the event, can be multiline
        pics: [],   // list of URLs of pics, ["/img/amphetamine1.png", "/img/amphetamine2.png"]
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
    return Location;
}]);