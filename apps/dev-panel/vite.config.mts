import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname(__filename);

const workspaceRoot = resolve(__dirname, '../../');

export default defineConfig( ({ command }) => {
  const isBuild = command === 'build';

  return {
    root: __dirname,

    cacheDir: '../../node_modules/.vite/apps/dev-panel',

    plugins: [react(), nxViteTsPaths()],

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
        localsConvention: 'camelCaseOnly', // ✅ .dp-toggle → styles.dpToggle automatically
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
          outDir: '../../build',
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
});
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

// export default defineConfig({
//   root: __dirname,
//   cacheDir: '../../node_modules/.vite/apps/dev-panel',
//
//   plugins: [react(), nxViteTsPaths()],
//   define: {
//     'process.env': {}, // 👈 FIX
//   },
//   server: {
//     port: 5173,
//     strictPort: true,
//     origin: 'http://localhost:5173',
//     cors: true
//   },
//   build: {
//     outDir: '../../build/dev-panel',
//     emptyOutDir: true,
//
//     sourcemap: true,
//
//     lib: {
//       entry: 'src/main.tsx', // 👈 IMPORTANT (your entry file)
//       name: 'DevPanel',
//       fileName: 'dev-panel',
//       formats: ['iife'], // 👈 best for WordPress
//     },
//
//     rollupOptions: {
//       output: {
//         globals: {
//           react: 'React',
//           'react-dom': 'ReactDOM',
//         },
//       },
//     },
//   },
// });
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);  // ✅ __dirname doesn't exist natively in .mts
//
// export default defineConfig(({ command }) => {
//   const isBuild = command === 'build';
//
//   return {
//     root: __dirname, // ✅ Let Vite use the config file's directory as root
//     // root: import.meta.dirname,
//
//     // root: 'apps/dev-panel', // ✅ FIXED
//     cacheDir: '../../node_modules/.vite/apps/dev-panel',
//     base: '/',
//
//     // plugins: [react(), nxViteTsPaths()],
//
//     plugins: [
//       react({
//         include: ['**/*.tsx', '**/*.ts', '**/*.jsx', '**/*.js'],
//       }),
//       nxViteTsPaths(),
//     ],
//     define: {
//       'process.env': {},
//     },
//     server: {
//       port: 5173,
//       strictPort: true,
//       origin: 'http://localhost:5173',
//       cors: true,
//       hmr: {
//         host: 'localhost',
//       },
//     },
//     // server: {
//     //   port: 5173,
//     //   strictPort: true,
//     //   origin: 'http://localhost:5173',
//     //   cors: true,
//     // },
//
//     build: isBuild
//       ? {
//           outDir: '../../build/dev-panel',
//           emptyOutDir: true,
//           sourcemap: true,
//           //
//           // lib: {
//           //   entry: 'src/main.tsx',
//           //   name: 'DevPanel',
//           //   fileName: 'dev-panel',
//           //   formats: ['iife'],
//           // },
//
//           rollupOptions: {
//             output: {
//               globals: {
//                 react: 'React',
//                 'react-dom': 'ReactDOM',
//               },
//             },
//           },
//         }
//       : undefined,
//   };
// });

// import { dirname, resolve } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
//
// export default defineConfig(({ command }) => {
//   const isBuild = command === 'build';
//
//   return {
//     root: __dirname,
//     cacheDir: '../../node_modules/.vite/apps/dev-panel',
//     base: '/',
//
//     plugins: [
//       react(),
//       nxViteTsPaths(),
//     ],
//
//     resolve: {
//       alias: {
//         '@app': resolve(__dirname, 'src/app'), // ✅ explicit fallback
//         '@component': resolve(__dirname, 'src/components'),
//       },
//     },
//
//     define: { 'process.env': {} },
//
//     server: {
//       port: 5173,
//       strictPort: true,
//       cors: true,
//       hmr: { host: 'localhost' },
//       origin: 'http://localhost:5173',
//     },
//
//     build: isBuild
//       ? {
//           outDir: '../../build',
//           emptyOutDir: true,
//           sourcemap: true,
//           lib: {
//             entry: resolve(__dirname, 'src/main.tsx'),
//             name: 'DevPanel',
//             fileName: 'debug-panel',
//             formats: ['iife'],
//           },
//           rollupOptions: {
//             external: ['react', 'react-dom'],
//             output: {
//               globals: { react: 'React', 'react-dom': 'ReactDOM' },
//             },
//           },
//         }
//       : undefined,
//   };
// });
