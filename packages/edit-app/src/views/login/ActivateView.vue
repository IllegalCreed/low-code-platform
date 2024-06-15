<template>
  <div v-if="hasToken">
    <div v-if="activating">正在激活请稍后...</div>
    <div v-else>
      <div v-if="activateSucceed">激活成功，请返回首页登录</div>
      <div v-else>token已失效</div>
    </div>
  </div>
  <div v-else>请检查你的邮箱，点击激活链接以完成注册流程。</div>
</template>

<script setup lang="ts">
const hasToken = ref(false)
const activating = ref(true)
const activateSucceed = ref(false)
</script>

<style lang="scss" scoped></style>
