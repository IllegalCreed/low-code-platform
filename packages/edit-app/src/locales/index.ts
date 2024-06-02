import { createI18n } from 'vue-i18n'
/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
// import messages from '@intlify/unplugin-vue-i18n/messages'
import en from './en'
import zh from './zh'

const i18n = createI18n({
  legacy: false, // for Vue 3, set to false
  locale: 'zh', // 默认显示语言
  fallbackLocale: 'zh', // 默认回退语言
  messages: {
    en,
    zh
  },
})

export default i18n
