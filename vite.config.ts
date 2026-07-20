import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import AutoImport from 'unplugin-auto-import/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mahjong_helper/",
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: null,
      manifest: false,
      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api\//],
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}'],
        runtimeCaching: []
      }
    }),
    AutoImport({
      resolvers: [TDesignResolver({
        library: 'mobile-vue'
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'mobile-vue'
      })]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
