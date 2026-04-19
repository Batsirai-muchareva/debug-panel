import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig( () => ( {
    // @ts-ignore
    root: import.meta.dirname,
    cacheDir: '../../node_modules/.vite/libs/providers',
    plugins: [
        react(),
        nxViteTsPaths(),
        nxCopyAssetsPlugin(['*.md']),
        dts({
            entryRoot: 'src',
            // @ts-ignore
            tsconfigPath: path.join(import.meta.dirname, 'tsconfig.lib.json'),
            pathsToAliases: false,
        }),
    ],

    build: {
        outDir: '../../dist/libs/providers',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
          transformMixedEsModules: true,
        },
        lib: {
          // Could also be a dictionary or array of multiple entry points.
          entry: 'src/index.ts',
          name: '@debug-panel/providers',
          fileName: 'index',
          // Change this to the formats you want to support.
          // Don't forget to update your package.json as well.
          formats: ['es' as const],
        },
        rollupOptions: {
          // External packages that should not be bundled into your library.
          external: ['react', 'react-dom', 'react/jsx-runtime'],
        },
      },
}));
