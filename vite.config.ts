import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  publicDir: 'src/static',
  server: {
    port: 8182,
  },
  plugins: [
    UnoCSS(),
    svelte(),
  ],
})
