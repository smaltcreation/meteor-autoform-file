Package.describe({
    name: 'smaltcreation:autoform-file',
    version: '0.0.1',
    summary: 'File input for autoform',
    git: 'https://github.com/SmaltCreation/meteor-autoform-file.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.3');
    api.export('Smalt', 'client');

    // Packages
    api.use([
        'underscore',
        'templating',
        'tracker',
        'aldeed:autoform@5.3.2'
    ], 'client');

    // Files
    api.addFiles([
        // Lib
        'lib/client/lib/container.js',
        'lib/client/lib/file/new.js',
        'lib/client/lib/file/uploaded.js',
        'lib/client/lib/input.js',
        // Input
        'lib/client/input/input.html',
        'lib/client/input/input.js',
        // Preview
        'lib/client/preview/preview.html',
        'lib/client/preview/preview.js',
        'lib/client/preview/preview.css'
    ], 'client');
});
