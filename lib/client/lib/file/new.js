Smalt.NewFile = function (file) {
    this.id = null;
    this.file = file;
    this.src = null;
    this.error = null;

    this.render();

    if (Smalt.Autoform.Input.File.automaticUpload) {
        this.upload();
    }
};

Smalt.NewFile.prototype.equals = function (file) {
    var keys = ['name', 'size', 'type'];
    var equals = true;
    var self = this;

    keys.forEach(function (key) {
        if (self.file[key] !== file[key]) {
            equals = false;
            return false;
        }
    });

    return equals;
};

Smalt.NewFile.prototype.render = function () {
    var reader = new FileReader();

    reader.onload = (function (self) {
        return function (event) {
            self.src = event.target.result;
            Smalt.Autoform.Input.File.dependency.changed();
        };
    })(this);

    reader.readAsDataURL(this.file);
};

Smalt.NewFile.prototype.upload = function () {
    var self = this;

    Smalt.Autoform.Input.File.collection.insert(this.file, function (err, doc) {
        if (err) {
            self.error = err;
        } else {
            self.id = doc._id;
        }

        Smalt.Autoform.Input.File.dependency.changed();
    });
};

Smalt.NewFile.prototype.uploadSync = function () {
    var doc = Smalt.Autoform.Input.File.collection.insert(this.file);
    this.id = doc._id;
};

Smalt.NewFile.prototype.remove = function () {
    if (this.id) {
        Smalt.Autoform.Input.File.collection.remove(this.id);
    }
};

Smalt.NewFile.prototype.get = function () {
    return this.id ? this.id : this.file.name;
};
