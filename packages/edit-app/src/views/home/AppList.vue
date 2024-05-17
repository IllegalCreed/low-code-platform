<template>
  <div class="app-list" :style="{ width: containerWidth + 'px' }">
    <AppListItem v-for="app in apps" :key="app.id" :app="app" />
  </div>
</template>

<script setup lang="ts">
import { useAppsStore } from '@/stores/modules/apps';
import AppListItem from './AppListItem.vue';
import { useFlexWarpCenter } from '@/composables/layout'

const { apps } = useAppsStore();

const { containerWidth } = useFlexWarpCenter(160, 8, 8);
</script>

<style scoped>
.app-list {
  @apply flex flex-wrap justify-start py-10 px-2 mx-auto;
}
</style>