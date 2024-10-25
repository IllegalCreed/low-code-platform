<template>
  <drop-down-item v-for="item in props.items" :key="item.key" :item="item"></drop-down-item>
</template>

<script setup lang="ts">
interface Props {
  items: Item[];
}
const props = defineProps<Props>();
</script>

<style lang="scss" scoped></style>
