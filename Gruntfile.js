module.exports = function (grunt) {
    grunt.initConfig( {
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            zip: 'zip-builds',
            dest: 'dest'
        },

        shell: {
            npm_install: {
                command: 'npm install'
            },
            npm_build: {
                command: 'npm run build:production'
            },
            npm_production: {
                command: 'npm ci --omit=dev'
            }
        },

        compress: {
            zip: {
                options: {
                    archive: 'zip-builds/dev-debug-tool.zip',
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
                    '**',
                    '!assets/**',
                    '!deleted/**',
                    '!docs/**',
                    '!node_modules/**',
                    '!vendor/**',
                    '!zip-builds/**',
                    '!dest/**',

                    // ⛔ exclude generated files
                    '!build/styles.js',
                    '!build/styles.asset.php',
                    '!build/styles-rtl.css',

                    '!.gitignore',
                    '!composer.json',
                    '!composer.lock',
                    '!Gruntfile.js',
                    '!package-lock.json',
                    '!package.json',
                    '!README.md',
                    '!tsconfig.json',
                    '!webpack.config.js',
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

    grunt.registerTask( 'build', [
        'shell:npm_install',
        'shell:npm_build',
        'shell:npm_production',
        'clean',
        'copy',
        'zip',
        'clean:dest',
        'shell:npm_install',
    ] );
};
