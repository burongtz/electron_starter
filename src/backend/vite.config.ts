import { builtinModules } from 'node:module'
import { defineConfig } from 'vite'

const rootDir: string = process.cwd();

export default defineConfig({
  envDir: rootDir,
  root: __dirname,
  base: './',
  build: {
    outDir: `${rootDir}/dist`,
    sourcemap: false,
    emptyOutDir: false,
    // target: 'node14',
    lib: {
      entry: './main.ts',
      // Define the build format, Electron support CJS.
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules.flatMap((p: string) => [p, `node:${p}`]),
      ],
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
