module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'simple-import-sort',
        'import',
    ],
    reportUnusedDisableDirectives: true,
    overrides: [
        {
            files: ['assets/js/libs/**'],
            rules: {
                /**
                 * 1. Libs expose API via index.ts only
                 */
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['@app/*'],
                                message:
                                    'Libs must not import from app. Move shared logic to libs or pass it as an argument.',
                            },
                            {
                                // group: ['@libs/*'],
                                group: ['@libs/*/*'],
                                message:
                                    'Inside libs, use relative imports instead of @libs/*.',
                                //               'Do not deep-import from libs. Import only from the public API (index.ts).',
                            },
                        ],
                    },
                ],
            },
        },
    ],
    rules: {
        // 'import/no-relative-packages': 'error',
        'no-restricted-imports': ['error', {
            patterns: [
                // {
                //     group: [ './assets/js/libs/*' ],
                //     message: 'Import libs via @libs/* instead of relative paths'
                // },
                {
                    group: ['@libs/*/*'],
                    message:
                        'Do not import internal files from libs. Import only from the lib public API (index.ts).',
                },
            ]
        } ],
        // 'import/no-cycle': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'typeLike',
                format: [ 'PascalCase' ],
            },
        ],
        'simple-import-sort/imports': [
            'error',
            {
                groups: getImportSortGroups(),
            },
        ],
        // 'unicorn/filename-case': [
        //     'error',
        //     {
        //         case: 'kebabCase',
        //     },
        // ],
        // 'import/no-restricted-paths': [
        //     'error',
        //     {
        //         zones: [
        //             {
        //                 target: './assets/js/app/**',
        //                 from: ['./assets/js/libs/**'],
        //                 message: 'Libs cannot import from app.',
        //             },
        //
        //             // {
        //             //     target: './packages/libs',
        //             //     from: [ './packages/core', './packages/tools' ],
        //             //     message: 'Libraries can only import other libraries.',
        //             // },
        //             // {
        //             //     target: './packages/tools',
        //             //     from: [ './packages/*' ],
        //             //     message: 'Tools cannot import from Core, Libs or Tools.',
        //             // },
        //         ],
        //     },
        // ],
        // 'import/no-restricted-paths': [
        //     'error',
        //     {
        //         zones: [
        //             {
        //                 target: './assets/js/app/**',
        //                 from: ['./assets/js/libs/**'],
        //                 message: 'Libs cannot import from app.',
        //             },
        //         ],
        //     },
        // ]
    }
}

function getImportSortGroups() {
    return [
        [
            // React imports.
            '^react$',
            '^react-dom$',
            '^react-dom\\/',

            // Packages that don't start with @ ('fs', 'path', etc.)
            '^\\w',

            // Elementor imports.
            '^@wordpress\\/',

            // Other Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            '^@?\\w',
        ],

        [ '^@libs\\/' ],

        [
            '^@app\\/',
            '^@component\\/',
        ],

        // Absolute imports and other imports such as Vue-style `@/foo`.
        // Anything not matched in another group.
        [ '^' ],

        // Relative imports.
        // Anything that starts with a dot.
        [ '^\\.' ],
    ];
}
