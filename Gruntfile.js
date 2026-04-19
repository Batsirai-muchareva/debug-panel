module.exports = function (grunt) {
    grunt.initConfig( {
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            // zip: 'zip-builds',
            dest: 'dest'
        },
        compress: {
            zip: {
                options: {
                    archive: 'zip-builds/dev-debug-tool-<%= pkg.version %>.zip',
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dest',
                        src: ['**/*'],
                        dest: '/'
                    }
                ]
            }
        },

        copy: {
            main: {
                src: [
                    'src/**',
                    'build/**',
                    'debug-panel.php',
                    'vendor/**',
                    // '**',
                    // '!assets/**',
                    // '!deleted/**',
                    // '!docs/**',
                    // '!node_modules/**',
                    // '!vendor/**',
                    // '!zip-builds/**',
                    // '!dest/**',

                    // ⛔ exclude generated files
                    // '!build/styles.js',
                    // '!build/styles.asset.php',
                    // '!build/styles-rtl.css',

                    // '!.gitignore',
                    // '!composer.json',
                    // '!composer.lock',
                    // '!Gruntfile.js',
                    // '!package-lock.json',
                    // '!package.json',
                    // '!README.md',
                    // '!tsconfig.json',
                    // '!webpack.config.js',
                ],
                expand: true,
                dest: 'dest/'
            }
        }
    } );

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask( 'zip', [ 'compress:zip' ]);

    grunt.registerTask( 'production', [
        'clean',
        'copy',
        'zip',
        'clean:dest',
    ] );
};
