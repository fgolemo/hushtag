serviceModule.factory('Hushtag', ['$http', function ($http) {
    function Hushtag(data) {
        if (data) {
            this.setData(data);
        }
    };
    Hushtag.prototype = {
        id: "",     // unique identifier, either int (unlikely) or string.
        name: "",   // string, "Amphetamine"
        family: [], // list of IDs of related substances [42, 13, 9]
        pics: [],   // list of URLs of pics, ["/img/amphetamine1.png", "/img/amphetamine2.png"]
        dosages: "",// string with short, typical dosage info, "1-2 pills per person per night"
        legality: "",// medium string with common legality, "highly illegal in almost all countries except Thailand & Indonesia"
        safety: "", // medium string with common safety advise, "highly addictive, will cause mild depression a few days after consumption"
        description: "", // short string / one line summary of the drug, "famous party & festival drug that increases social interaction,..."
        synonyms: [],// list of strings of other known aliases, ["Amp", "Giga", "headsmash"]
        forms: "",  // short string, common form(s), "usually pills, rarely liquid"
        uses: [],   // list of IDs of HushtagUse(s), [123, 456]
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
    return Hushtag;
}]);