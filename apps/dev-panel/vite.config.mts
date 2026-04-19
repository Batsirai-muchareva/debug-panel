import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// @ts-ignore
const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname(__filename);

const workspaceRoot = resolve(__dirname, '../../');

export default defineConfig( ({ command }) => {
  const isBuild = command === 'build';

  return {
      root: __dirname,

      cacheDir: '../../node_modules/.vite/apps/dev-panel',

      plugins: [react(), nxViteTsPaths()],

      define: {
          'process.env': {},
      },

      css: {
          preprocessorOptions: {
              scss: {
                  additionalData: `
                      @use '${workspaceRoot}/assets/styles/global-variables' as *;
                      @use '${workspaceRoot}/assets/styles/global-mixins' as *;
                  `,
              },
          },
          modules: {
              localsConvention: 'camelCaseOnly',
          },
      },

      server: {
          port: 5173,
          strictPort: true,
          origin: 'http://localhost:5173',
          cors: true,
          hmr: {
              host: 'localhost',
          },
      },

      build: isBuild
          ? {
                outDir: '../../build/dev-panel',
                emptyOutDir: true,
                sourcemap: true,

                lib: {
                    entry: resolve(__dirname, 'src/main.tsx'),
                    name: 'DevPanel',
                    fileName: 'debug-panel',
                    formats: ['iife'],
                },

                rollupOptions: {
                    external: ['react', 'react-dom'],
                    output: {
                        globals: { react: 'React', 'react-dom': 'ReactDOM' },
                    },
                },
            }
          : undefined,
  };
} );
