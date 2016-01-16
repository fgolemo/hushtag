tagsModule.service('Tags', ['Settings', '$q', '$http', function (Settings, $q, $http) {

    this.tags = [];

    this._minimumSearchStringLength = 3;

    this.get = function (force) {
        var scope = this;

        var deferred = $q.defer();

        if (JSON.stringify(this.tags) != "[]" && (!force || force == null)) {
            console.log("loading from cache");
            deferred.resolve(this.tags);

        } else {
            $http.get(Settings.database + "tags")
                .success(function (data) {
                    if (data.status && data.status == "success") {
                        scope.tags = data.tags;
                        deferred.resolve(scope.tags);
                    } else {
                        console.log("ERR: couldn't refresh tags although server comm was fine");
                        deferred.reject(data);
                    }

                })
                .error(function (err) {
                    console.log("ERR: couldn't refresh tags");
                    deferred.reject(err);
                });
        }
        return deferred.promise;
    };

    this.getAllStrings = function() {
        var out = [];
        for(var i in tags) {
            out.push(tags[i].name);
        }
        return out;
    };

    this._getTag = function(text) {
        var pieces = text.split(" ");
        var hashpieces = pieces[pieces.length-1].split("#");

        if(hashpieces.length == 1 || hashpieces[hashpieces.length-1].length < this._minimumSearchStringLength) {
            return false;
        } else {
            return hashpieces[hashpieces.length-1];
        }
    };

    this._findInTags = function(tag) {
        var matches = [];
        for(var i in this.tags) {
            if (this.tags[i].name.toLowerCase().indexOf(tag.toLowerCase()) > -1 ||
                this.tags[i].type.indexOf(tag.toLowerCase()) > -1) {
                matches.push(this.tags[i]);
            }
        }
        return matches;
    };

    this.detect = function(textInput, poHandler, $event) {
        var tag = this._getTag(textInput);
        if (tag !== false) {
            var matches = this._findInTags(tag);
            if (matches.length > 0) {
                poHandler.openPopover($event, matches);
            } else {
                poHandler.closePopover(false);
            }
        } else {
            poHandler.closePopover(false);
        }
    };

    this.insertTag = function(textModel, match) {
        var pieces = textModel.split("#");
        pieces[pieces.length-1] = match.slug + " ";
        var out = pieces.join("#");
        return out;
    }

}]);