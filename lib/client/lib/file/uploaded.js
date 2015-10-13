Smalt.UploadedFile = function (file) {
    this.id = file._id;
    this.file = file;
    this.error = false;
    this.src = file.url();
};

Smalt.UploadedFile.prototype.remove = function () {
    if (Smalt.Autoform.Input.File.automaticRemove) {
        Smalt.Autoform.Input.File.collection.remove(this.id);
    } else {
        Smalt.Autoform.Input.File.removedIds.push(this.id);
    }
};
