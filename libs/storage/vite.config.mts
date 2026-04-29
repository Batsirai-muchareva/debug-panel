import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig( () => ( {
    // @ts-ignore
    root: import.meta.dirname,
    cacheDir: '../../node_modules/.vite/libs/storage',
    plugins: [
        nxViteTsPaths(),
        nxCopyAssetsPlugin([ '*.md' ]),
        dts({
            entryRoot: 'src',
            // @ts-ignore
            tsconfigPath: path.join( import.meta.dirname, 'tsconfig.lib.json' ),
            pathsToAliases: false,
        }),
    ],

    build: {
        outDir: '../../dist/libs/storage',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        lib: {
            entry: 'src/index.ts',
            name: '@debug-panel/storage',
            fileName: 'index',
            formats: [ 'es' as const ],
        },
    },
} ) );
