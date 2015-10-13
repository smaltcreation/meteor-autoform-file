Template.afInputSmaltImagePreview.helpers({
    uploading: function () {
        return Smalt.Autoform.Input.File.automaticUpload && this.error === null && this.id === null;
    }
});

Template.afInputSmaltImagePreview.events({
    'click .remove': function (event, template) {
        Smalt.Autoform.Input.File.remove(
            template.data.id
                ? { id: template.data.id }
                : { src: template.data.src }
        );
    }
});
