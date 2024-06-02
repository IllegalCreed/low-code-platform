<template>
  <div class="item-root-container" @click="clickHandle">
    <span font-bold>{{ props.item.content }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  item: Item
}
const props = defineProps<Props>()
const itemClickHandle = inject<((key: string) => void) | undefined>('itemClickHandle')

function clickHandle() {
  itemClickHandle?.(props.item.key)
}
</script>

<style lang="scss" scoped>
.item-root-container {
  @apply cursor-pointer;
  @apply block;
  @apply rounded-1 py-2 px-4;

  &:hover {
    background-color: var(--height-light-background-color);
  }
}
</style>
