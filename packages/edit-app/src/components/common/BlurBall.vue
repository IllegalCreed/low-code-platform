<template>
  <div class="blur-ball"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '/src/styles/_common.scss' as *;

.blur-ball {
  @apply block;
  @apply rounded-1/2 aspect-square;
  @apply -translate-y-1/2 -translate-x-1/2;
  @apply blur-3xl opacity-80;

  /*NOTE:  本来想用@entend的，但是似乎scoped里面无法用片段，只能用mixin */
  @include background-colorful;
}
</style>
