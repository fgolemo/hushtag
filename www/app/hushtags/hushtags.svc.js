hushtagsModule.factory('Hushtag', [function () {
    function Hushtag(data) {
        if (data) {
            this.setData(data);
        }
    }
    Hushtag.prototype = {
        id: "",     // unique identifier, either int (unlikely) or string.
        name: "",   // string, "Amphetamine"
        family: [], // list of IDs of related substances [42, 13, 9]
        pics: [],   // list of URLs of pics, ["/img/amphetamine1.png", "/img/amphetamine2.png"]
        dosages: "no dosage info provided",// string with short, typical dosage info, "1-2 pills per person per night"
        legality: "no legality information provided",// medium string with common legality, "highly illegal in almost all countries except Thailand & Indonesia"
        safety: "no safety info provided", // medium string with common safety advise, "highly addictive, will cause mild depression a few days after consumption"
        description: "no description provided", // short string / one line summary of the drug, "famous party & festival drug that increases social interaction,..."
        synonyms: [],// list of strings of other known aliases, ["Amp", "Giga", "headsmash"]
        forms: "no forms info provided",  // short string, common form(s), "usually pills, rarely liquid"
        stories: [],   // list of IDs of HushtagStories(s), [123, 456]
        tags: [],   // list of IDs of tags on this entry, [77, 433, 182]
        flags: [],  // list of IDs of reports/flags, [1123, 1883, 1992, 1221]
        owner: "",  // either string (if the event wasn't created by a user) or user ID
        refs: [
            {
                attribute: "family",
                type: "Hushtag",
                quantity: "many"
            },
            {
                attribute: "stories",
                type: "Story",
                quantity: "many"
            }
        ],

        setData: function (data) {
            angular.extend(this, data);
        },
        unpack: function () {

        },
        pack: function () {

        }
    };
    return Hushtag;
}]);