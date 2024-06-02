function getLanguageArray() {
  const { messages } = useI18n()

  return Object.entries(messages.value).map(([key, value]) => ({
    key,
    content: value.language as string
  }))
}

export function useLanguage() {
  const { t, locale } = useI18n()

  const currentLanguage = computed(() => {
    return { key: locale.value, content: t('language') }
  })

  const allLanguage = getLanguageArray()

  const otherLanguage = computed(() => {
    return allLanguage.filter((item) => {
      return item.key != locale.value
    })
  })

  return { currentLanguage, otherLanguage, allLanguage }
}
