import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import UnoCSS from 'unocss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

Object.assign(process.env, loadEnv(process.env.NODE_ENV as string, process.cwd()))
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
          'vue-i18n': ['useI18n'],
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
    Icons({ compiler: 'vue3' }),
    VueI18nPlugin({
      // include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/static/**') // NOTE: 导入静态资源用，比如json或者yaml，记得同时修改tsconfig
    })
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
        additionalData: `@use 'src/styles/_neumorphism.scss' as *;
        @use 'src/styles/_tailwind-size.scss' as *;
        @use 'src/styles/_tailwind-colors.scss' as *;`
      }
    }
  }
})
