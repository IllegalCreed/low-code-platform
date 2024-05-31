<template>
  <div
    class="darkmode-switch"
    :class="{ 'darkmode-switch--checked': isDarkMode }"
    @click="useToggleDark"
  >
    <div class="darkmode-switch__thumb"></div>
  </div>
</template>

<script setup lang="ts">
import { useToggleDark, isDarkMode } from '@/composables/darkmode'
</script>

<style lang="scss" scoped>
.darkmode-switch {
  @apply relative inline-flex items-center h-6 rounded-full w-11;
  background-color: #e5e7eb;
  transition: background-color 0.2s;

  &--checked {
    @apply bg-blue-600;
  }

  &__thumb {
    @apply inline-block w-4 h-4 transform bg-white rounded-full;
    transition: transform 0.2s;
  }

  &--checked &__thumb {
    @apply translate-x-5;
  }
}
</style>
