<template>
  <drop-down-item v-for="item in props.items" :key="item.key" :item="item"></drop-down-item>
</template>

<script setup lang="ts">
import type { Item } from './types';

interface Props {
  items: Item[];
}
const props = defineProps<Props>();
</script>

<style lang="scss" scoped></style>
