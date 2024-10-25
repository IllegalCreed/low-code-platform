<template>
  <neumorphism-switch :activeColor="activeColor" :defaultValue="isDarkMode" @changed="useSetDark">
    <i-ic:twotone-dark-mode v-if="isDarkMode"></i-ic:twotone-dark-mode>
    <i-ic:twotone-light-mode v-else></i-ic:twotone-light-mode>
  </neumorphism-switch>
</template>

<script setup lang="ts">
import { getCssVar } from '@/utils/color';
import { useSetDark, isDarkMode } from '@/composables/darkmode';
import { VAR_SWITCH_INACTIVE_BACKGROUND } from '@/styles/cssVariables';

const activeColor = ref(getCssVar(VAR_SWITCH_INACTIVE_BACKGROUND));

watch(
  isDarkMode,
  async () => {
    await nextTick();
    activeColor.value = getCssVar(VAR_SWITCH_INACTIVE_BACKGROUND);
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped></style>
