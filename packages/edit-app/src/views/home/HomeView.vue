<template>
  <div class="home-view">
    <Header></Header>
    <div class="content">
      <RouterView />
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from './HomeHeader.vue';
import Footer from './HomeFooter.vue';
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex: 1;
  @apply overflow-auto;
}
</style>
