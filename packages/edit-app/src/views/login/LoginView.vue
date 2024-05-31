<template>
  <div class="login-root-container">
    <div class="login-banner-container"></div>
    <div class="login-main-container">
      <el-input v-model="account" placeholder="用户名" size="default" clearable></el-input>
      <el-input
        v-model="password"
        placeholder="密码"
        type="password"
        size="default"
        clearable
      ></el-input>
      <el-button type="primary" size="default" @click="onLogin">登录</el-button>
      <neumorphism-button id="login-btn">登录</neumorphism-button>
      <div v-if="error">{{ error }}</div>
      <dark-mode-switch />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth'

const router = useRouter()
const authStore = useAuthStore()

const account = ref('')
const password = ref('')
const error = ref('')

async function onLogin() {
  try {
    const result = await authStore.login(account.value, password.value)
    if (result) {
      router.push({ name: 'home' }) // 导航到主页
    }
  } catch (err: any) {
    error.value = err.message
  }
}
</script>

<style lang="scss" scoped>
.login-root-container {
  /* flex */
  @apply flex flex-row items-stretch justify-stretch;
  @apply p-8 min-h-screen;
}
.login-banner-container {
  @apply flex-1;
  @apply rounded-2;
  @include neumorphism-glass-shadow(0.25rem);
}
.login-main-container {
  @apply flex-1 flex flex-col items-center justify-center;

  #login-btn,
  .el-input,
  .el-button {
    @apply mb-5 w-72; // margin-bottom: 20px; width: 18rem;
  }

  .el-button {
    @apply mt-2.5; // margin-top: 10px;
  }
}
</style>
