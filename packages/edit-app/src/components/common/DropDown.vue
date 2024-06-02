<template>
  <div class="dropdown-root-container">
    <div>
      <slot></slot>
    </div>
    <div class="popup">123123123123123123123123</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.dropdown-root-container {
  @apply relative cursor-pointer;
  @apply h-8;
  @apply flex items-center justify-center;

  .popup {
    @apply absolute right-0 top-8;
    @apply p-4;
    @apply opacity-0 invisible;
    @apply -translate-y-1;
    @apply rounded-2;
    @include neumorphism-card(0.25rem);
    transition:
      opacity 0.25s,
      visibility 0.25s,
      transform 0.25s;
  }

  &:hover .popup {
    @apply opacity-100 visible translate-y-0;
  }
}
</style>
