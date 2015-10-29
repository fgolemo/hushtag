commentsModule.service('CommentsManager', ['Manager', 'ManagerPool', function (Manager, ManagerPool) {
    this.m = new Manager("Comment");
    var scope = this;
    this.m.createComment = function (comment, parent, parentType, cb) {
        var parentManager = ManagerPool.getManager(parentType);
        if (!parentManager) {
            cb(false);
            return;
        }
        scope.m.create(comment).then(function (res) {
            if (res && res.status && res.status == "success") {
                console.log("created comment, now adding it to parent");
                var newComment = res.obj;
                if (!parent.comments) {
                    parent.comments = [];
                }
                parent.comments.push(newComment.id);
                console.log("DEBUG1");
                var parentUpdate = {
                    id: parent.id,
                    comments: parent.comments
                };
                console.log("DEBUG2");
                parentManager.m.update(parentUpdate, true).then(function(newParent) {
                    console.log("parent updated successfully");
                    console.dir(newParent);
                    cb(true);
                }, function(err) {
                    console.log("ERROR: can't update parent after comment:");
                    console.dir(err);
                    cb(false);
                });
            }
        }, function (err) {
            console.log("ERROR: problem creating new comment");
            console.dir(err); //TODO: add negative toast here
            cb(false);
        });
    }
}]);