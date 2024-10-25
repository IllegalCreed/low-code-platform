<template>
  <div class="page-editor">
    <div class="sidebar left">
      <ComponentList />
    </div>
    <div class="main-editor">
      <VisualEditor />
    </div>
    <div class="sidebar right">
      <PropertiesPanel />
      <ComponentTree />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComponentList from './ComponentList.vue';
import VisualEditor from './VisualEditor.vue';
import PropertiesPanel from './PropertiesPanel.vue';
import ComponentTree from './ComponentTree.vue';
</script>

<style lang="scss">
.page-editor {
  @apply flex h-full;
}
.sidebar {
  @apply w-1/5 min-w-[200px];
}
.left {
  @apply order-1;
}
.main-editor {
  @apply order-2 flex-1;
}
.right {
  @apply order-3 flex flex-col;
}
</style>
