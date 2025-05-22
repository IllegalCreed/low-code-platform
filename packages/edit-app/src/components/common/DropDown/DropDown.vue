<template>
  <div
    @mouseover="props.hoverable ? (isPopupVisible = true) : null"
    @mouseleave="props.hoverable ? (isPopupVisible = false) : null"
    @click="!props.hoverable ? (isPopupVisible = !isPopupVisible) : null"
    class="dropdown-root-container"
  >
    <div cursor-pointer>
      <slot></slot>
    </div>
    <div class="popup" :class="{ visible: isPopupVisible }">
      <span class="current" v-if="props.current">{{ props.current?.content }}</span>
      <drop-down-menu :items="props.items"></drop-down-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from './types';

const props = withDefaults(
  defineProps<{
    current?: Item;
    items: Item[];
    hoverable?: boolean;
  }>(),
  {
    hoverable: true,
  },
);

const emit = defineEmits<{
  onItemClick: [key: string];
}>();

provide('itemClickHandle', (key: string) => {
  emit('onItemClick', key);
});

const isPopupVisible = ref(false);
</script>

<style lang="scss" scoped>
.dropdown-root-container {
  @apply relative;
  @apply h-8;
  @apply flex items-center justify-center;

  .popup {
    @apply flex flex-col;
    @apply absolute right-0 top-8;
    @apply p-4 w-max;
    @apply opacity-0 invisible;
    @apply -translate-y-1;
    @apply rounded-2;
    @include neumorphism-card(0.25rem);
    transition:
      opacity 0.25s,
      visibility 0.25s,
      transform 0.25s;
  }

  .visible {
    @apply opacity-100 visible translate-y-0;
  }

  .current {
    @apply block;
    @apply select-none font-bold;
    @apply my-2 mx-4;
    color: var(--text-active-color);
  }
}
</style>
