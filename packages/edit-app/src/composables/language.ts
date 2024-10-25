import type { RemovableRef } from '@vueuse/core';

const storedLocale: RemovableRef<string> = useLocalStorage('app-locale', 'en');

function getLanguageArray() {
  const { messages } = useI18n();

  return Object.entries(messages.value).map(([key, value]) => ({
    key,
    content: value.language as string,
  }));
}

export function useLanguage() {
  const { t, locale } = useI18n();

  locale.value = storedLocale.value;

  watch(locale, (newLocale) => {
    storedLocale.value = newLocale;
  });

  const currentLanguage = computed(() => {
    return { key: locale.value, content: t('language') };
  });

  const allLanguage = getLanguageArray();

  const otherLanguage = computed(() => {
    return allLanguage.filter((item) => {
      return item.key != locale.value;
    });
  });

  return { currentLanguage, otherLanguage, allLanguage };
}
