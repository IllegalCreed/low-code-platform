import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [
    vue(),
    VueDevTools(),
    UnoCSS(),
    AutoImport({
      dts: true,
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        // 自定义导入
        {
          // 包导入
          axios: [
            // 默认别名导入
            ['default', 'axios'] // import { default as axios } from 'axios',
          ],
          moment: [['default', 'moment']],
          // 项目内导入
          '@/composables/darkmode': ['isDarkMode', 'useToggleDark'],
          '@/composables/layout': ['useFlexWrapCenter'],
          '@/composables/route': ['useMenuSelect']
        }
      ],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: true,
      resolvers: [ElementPlusResolver(), IconsResolver()]
    }),
    Icons({ compiler: 'vue3' })
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('.', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'src/styles/_neumorphism.scss' as *;`
      }
    }
  }
})
