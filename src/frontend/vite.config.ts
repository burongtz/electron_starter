import { defineConfig } from 'vite'
import { join } from 'path'
import { builtinModules } from 'module'

const rootDir: string = process.cwd();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  root: __dirname,
  base: './',
  build: {
    sourcemap: false,
    emptyOutDir: true,
    outDir: `${rootDir}/dist`,
    rollupOptions: {
      input: join(__dirname, 'index.html'),
      external: [
        ...builtinModules.flatMap((p: string) => [p, `node:${p}`]),
      ],
    }
  }
});
