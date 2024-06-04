<template>
  <neumorphism-switch :defaultValue="isDarkMode" @changed="useSetDark">
    <i-ic:twotone-light-mode v-if="isDarkMode"></i-ic:twotone-light-mode>
    <i-ic:twotone-dark-mode v-else></i-ic:twotone-dark-mode>
  </neumorphism-switch>
</template>

<script setup lang="ts">
import { useSetDark, isDarkMode } from '@/composables/darkmode'
</script>

<style lang="scss" scoped></style>
