import { createI18n } from 'vue-i18n';
/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
// import messages from '@intlify/unplugin-vue-i18n/messages'
import en_us from './en-US';
import zh_cn from './zh-CN';
import zh_tw from './zh-TW';
import ja from './ja';
import ko from './ko';
import fr from './fr';
import es from './es';
import pt from './pt';
import ru from './ru';
import ar from './ar';
import de from './de';
import it from './it';
import nl from './nl';
import pl from './pl';
import sv from './sv';
import th from './th';

const i18n = createI18n({
  legacy: false, // for Vue 3, set to false
  locale: 'zh-CN', // 默认显示语言
  fallbackLocale: 'zh-CN', // 默认回退语言
  globalInjection: false, // 禁止指令注入
  messages: {
    'en-US': en_us,
    'zh-CN': zh_cn,
    'zh-TW': zh_tw,
    ja,
    ko,
    fr,
    es,
    pt,
    ru,
    ar,
    de,
    it,
    nl,
    pl,
    sv,
    th,
  },
});

export default i18n;
