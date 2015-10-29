commentsModule.service('CommentsManager', ['Manager', 'ManagerPool', function (Manager, ManagerPool) {
    this.m = new Manager("Comment");
    var scope = this;
    this.createComment = function (comment, parent, parentType, cb) {
        var parentManager = ManagerPool.getManager(parentType);
        if (!parentManager) {
            cb(false);
            return;
        }
        return parentManager.m.createComment(comment, parent);
    }
}]);