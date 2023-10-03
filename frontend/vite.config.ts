import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import { builtinModules } from 'module'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: __dirname,
  base: './',
  build: {
    sourcemap: false,
    emptyOutDir: true,
    outDir: '../dist',
    rollupOptions: {
      input: join(__dirname, 'index.html'),
      external: [
        ...builtinModules.flatMap((p: string) => [p, `node:${p}`]),
      ],
    }
  }
});
