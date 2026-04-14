import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { VitePWA } from 'vite-plugin-pwa'
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// @ts-ignore
const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname(__filename);

const workspaceRoot = resolve(__dirname, '../../');

export default defineConfig( ( { command } ) => {
    const isBuild = command === 'build';

    return {
        root: __dirname,

        cacheDir: '../../node_modules/.vite/apps/server-panel',

        plugins: [
            react(),
            nxViteTsPaths(),
            nxCopyAssetsPlugin( ['*.md'] ),
            VitePWA( {
                registerType: 'autoUpdate',
                devOptions: {
                    enabled: true
                },
                manifest: {
                    name: 'Debug Panel',
                    short_name: 'Debug',
                    description: 'Debug and inspection panel',
                    theme_color: '#0d3330',
                    background_color: '#0d3330',
                    display: 'standalone',
                    start_url: '/wp-admin/admin.php?page=debug-panel',
                    scope: '/wp-admin/',

                    icons: [
                        {
                            src: '/wp-content/plugins/dev-debug-tool/build/server-panel/logo.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: '/wp-content/plugins/dev-debug-tool/build/server-panel/logo.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any maskable'
                        }
                    ]
                }
            })
        ],

        resolve: {
            alias: {
                '@sfdump-css': resolve(workspaceRoot, 'vendor/symfony/var-dumper/Resources/css/htmlDescriptor.css'),
            },
        },

        server: {
            port: 4200,
            host: 'localhost',
            cors: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
        preview: {
            port: 4200,
            host: 'localhost',
        },

        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                    @use '${workspaceRoot}/assets/styles/global-variables' as *;
                    @use '${workspaceRoot}/assets/styles/global-mixins' as *;
                `
                }
            },
            modules: {
                localsConvention: 'camelCaseOnly',
            },
        },

        // Uncomment this if you are using workers.
        // worker: {
        //   plugins: () => [ nxViteTsPaths() ],
        // },
        // build: {
        //     // outDir: '../../build/server-panel',
        //     outDir: '../../build/server-panel',
        //     emptyOutDir: true,
        //     reportCompressedSize: true,
        //     commonjsOptions: {
        //         transformMixedEsModules: true,
        //     },
        // },
        build: isBuild
            ? {
                outDir: '../../build/server-panel',
                emptyOutDir: true,
                sourcemap: true,
                reportCompressedSize: true,
                commonjsOptions: {
                    transformMixedEsModules: true,
                },

                // lib: {
                //     entry: resolve(__dirname, 'src/main.tsx'),
                //     name: 'DevPanel',
                //     fileName: 'debug-panel',
                //     formats: ['iife'],
                // },

                // rollupOptions: {
                //     external: ['react', 'react-dom'],
                //     output: {
                //         globals: { react: 'React', 'react-dom': 'ReactDOM' },
                //     },
                // },
            }
            : undefined,
    }
});




// server: {
//     port: 4200,
//     strictPort: true,
//     origin: 'http://localhost:4200',
//     cors: true,
//     hmr: {
//         host: 'localhost',
//     },
// },
// outDir: '../../build/server-panel',  // lands next to your plugin's /build
// emptyOutDir: true,
// server: {
//   port: 4200,
//   host: 'localhost',
// },
// build: {
//   outDir: '../../dist/apps/server-panel',
//   emptyOutDir: true,
//   reportCompressedSize: true,
//   commonjsOptions: {
//     transformMixedEsModules: true,
//   },
// },
// VitePWA({
//     registerType: 'autoUpdate',
//     devOptions: {
//         enabled: true
//     },
//     manifest: {
//         name: 'Debug Panel',
//         short_name: 'Debug',
//         description: 'Debug and inspection panel',
//         theme_color: '#0d3330',
//         background_color: '#0d3330',
//         display: 'standalone',
//         start_url: '/',
//         icons: [
//             {
//                 src: '/logo.png',
//                 sizes: '192x192',
//                 type: 'image/png'
//             },
//             {
//                 src: '/logo.png',
//                 sizes: '512x512',
//                 type: 'image/png',
//                 purpose: 'any maskable'
//             }
//         ]
//     }
// })
