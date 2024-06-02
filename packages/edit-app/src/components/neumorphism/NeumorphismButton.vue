<template>
  <button class="button-root-container">
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.button-root-container {
  @apply px-4 py-2;
  @apply rounded-2 border-0;
  @apply text-center font-medium;
  @include neumorphism-btn(0.25rem);
}
</style>
