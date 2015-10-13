AutoForm.addInputType('smalt-file', {
    template: 'afInputSmaltFile',
    valueOut: function() {
        var ids = [];

        Smalt.Autoform.Input.File.getUploaded().forEach(function (file) {
            ids.push(file.id);
        });

        Smalt.Autoform.Input.File.get().forEach(function (file) {
            ids.push(file.get());
        });

        if (Smalt.Autoform.Input.File.multiple) {
            return ids;
        }

        if (ids.length > 0) {
            return ids[0];
        }

        return null;
    }
});

Template.afInputSmaltFile.onCreated(function() {
    var multiple = _.has(this.data.atts, 'multiple') && this.data.atts.multiple === true;

    Smalt.Autoform.Input.File.collection = FS._collections[this.data.atts.collection];
    Smalt.Autoform.Input.File.init(multiple, this.data.value);
});

Template.afInputSmaltFile.helpers({
    placeholder: function () {
        return this.atts.placeholder || 'Select files';
    },
    files: function () {
        return Smalt.Autoform.Input.File.get();
    },
    uploadedFiles: function () {
        return Smalt.Autoform.Input.File.getUploaded();
    },
    btnClass: function () {
        return this.atts.btnClass || 'btn btn-default';
    }
});

Template.afInputSmaltFile.events({
    'click .add-images': function (event, template) {
        $('#' + template.data.atts.id).click();
    },
    'change input[type="file"]': function (event, template) {
        // Reset if not multiple
        if (!_.has(template.data.atts, 'multiple')) {
            Smalt.Autoform.Input.File.reset();
        }

        // Process files
        FS.Utility.eachFile(event, function (file) {
            Smalt.Autoform.Input.File.add(file);
        });

        // Reset file input
        $(event.target).val('');
    }
});
