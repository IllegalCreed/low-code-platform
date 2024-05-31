<template>
  <button class="button-root-container">
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.button-root-container {
  @apply p-4;
  @apply rounded-2 border-0;
  @include neumorphism-btn(0.25rem);
}
</style>
