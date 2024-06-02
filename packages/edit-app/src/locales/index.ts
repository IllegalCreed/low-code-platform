import { createI18n } from 'vue-i18n'
/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
// import messages from '@intlify/unplugin-vue-i18n/messages'
import en from './en'
import zh_cn from './zh_cn'
import ja from './ja'
import ko from './ko'
import fr from './fr'
import es from './es'
import pt from './pt'
import ru from './ru'
import zh_tw from './zh_tw'

const i18n = createI18n({
  legacy: false, // for Vue 3, set to false
  locale: 'zh_cn', // 默认显示语言
  fallbackLocale: 'zh_cn', // 默认回退语言
  messages: {
    en,
    zh_cn,
    ja,
    ko,
    fr,
    es,
    pt,
    ru,
    zh_tw
  }
})

export default i18n
