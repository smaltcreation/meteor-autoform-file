function Input () {
    this.files = [];
    this.uploadedFiles = [];
    this.removedIds = [];
    this.collection = null;
    this.dependency = new Tracker.Dependency();
    this.automaticUpload = true;
    this.automaticRemove = false;
    this.multiple = true;
}

Input.prototype.init = function (multiple, ids) {
    this.multiple = multiple;

    if (!ids) {
        return false;
    }

    if (typeof ids === 'string') {
        ids = [ids];
    }

    var self = this;
    var files = this.collection.find({
        _id: {
            $in: ids
        }
    });

    files.forEach(function (file) {
        self.uploadedFiles.push(new Smalt.UploadedFile(file));
    });
};

Input.prototype.add = function (file) {
    if (!this.contains(file)) {
        this.files.push(new Smalt.NewFile(file));
    }
};

Input.prototype.contains = function (file) {
    var contains = false;

    this.files.forEach(function (f) {
        if (f.equals(file)) {
            contains = true;
            return false;
        }
    });

    return contains;
};

Input.prototype.remove = function (filters) {
    if (!filters) {
        return false;
    }

    var containers = [this.uploadedFiles, this.files];
    var self = this;

    containers.forEach(function (container) {
        var file = _.findWhere(container, filters);

        if (!file) {
            return false;
        }

        file.remove();
        container.splice(container.indexOf(file), 1);
        self.dependency.changed();
    });
};

Input.prototype.get = function () {
    this.dependency.depend();

    return this.files;
};

Input.prototype.getUploaded = function () {
    this.dependency.depend();

    return this.uploadedFiles;
};

Input.prototype.getIds = function () {
    var ids = [];

    this.uploadedFiles.forEach(function (file) {
        ids.push(file.id);
    });

    this.files.forEach(function (file) {
        if (!file.id) {
            file.uploadSync();
        }

        ids.push(file.id);
    });

    return ids;
};

Input.prototype.reset = function () {
    this.files = [];
    this.uploadedFiles = [];
    this.removedIds = [];
};

Input.prototype.finalRemove = function () {
    var self = this;

    this.removedIds.forEach(function (id) {
        self.collection.remove(id);
    });
};

Smalt.Autoform.Input.File = new Input();
