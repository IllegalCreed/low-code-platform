<template>
  <TransitionGroup name="card" class="app-list" tag="div" :style="{ width: containerWidth + 'px' }">
    <AppListItem v-for="app in apps" :key="app.id" :app="app" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useAppsStore } from '@/stores/modules/apps';
import AppListItem from './AppListItem.vue';
import { useFlexWrapCenter } from '@/composables/layout';

const { apps } = useAppsStore();

const { containerWidth } = useFlexWrapCenter(160, 8, 8);
</script>

<style scoped>
.app-list {
  @apply flex flex-wrap justify-start py-10 px-2 mx-auto;
}

/* 定义进入和离开的过渡样式 */
.card-move,
.card-enter-active,
.card-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}
.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.card-enter-to,
.card-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
