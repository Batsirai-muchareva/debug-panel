module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            npm_install: {
                command: 'pnpm install',
            },
            production: {
                command: function() {
                    const pkg = grunt.file.readJSON('package.json');
                    const deps = Object.keys(pkg.dependencies);
                    const copies = deps
                        .map(dep => `cp -rL node_modules/${dep} dest/node_modules/${dep}`)
                        .join(' && ');

                    return `mkdir -p dest/node_modules && ${copies}`;
                }()
            },
        },
        clean: {
            dest: 'dest',
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
                        dest: '/',
                    },
                ],
            },
        },

        copy: {
            main: {
                src: [
                    'src/**',
                    'build/**',
                    'debug-panel.php',
                    'vendor/**',
                ],
                expand: true,
                dest: 'dest/',
            },
        },
    });

    grunt.registerTask( 'resolve-zip-name', function () {
        const version = grunt.config( 'pkg.version' );
        const base    = `zip-builds/dev-debug-tool-${ version }`;

        let archive = `${ base }.zip`;
        let i = 1;
        while ( grunt.file.exists( archive ) ) {
            archive = `${ base }-${ i }.zip`;
            i++;
        }

        grunt.config( 'compress.zip.options.archive', archive );
        grunt.log.writeln( `Archive: ${ archive }` );
    } );

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask( 'zip', [ 'resolve-zip-name', 'compress:zip' ] );

    grunt.registerTask( 'production', [
        'clean',
        'shell:npm_install',
        'copy',
        'shell:production',
        'zip',
        'clean',
    ] );
};
