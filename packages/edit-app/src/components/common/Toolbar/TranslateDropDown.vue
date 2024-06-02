<template>
  <drop-down :current="currentLanguage" :items="otherLanguage" @on-item-click="clickHandle">
    <div flex flex-row items-center space-x-0.5>
      <i-ion:language></i-ion:language>
      <i-mingcute:down-line></i-mingcute:down-line>
    </div>
  </drop-down>
</template>

<script setup lang="ts">
import { useLanguage } from '@/composables/language'

const { currentLanguage, otherLanguage } = useLanguage()
const { locale } = useI18n()

function clickHandle(key: string) {
  locale.value = key
}
</script>

<style></style>
