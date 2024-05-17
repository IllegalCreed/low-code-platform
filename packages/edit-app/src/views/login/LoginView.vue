<template>
    <div class="login-container">
        <el-input v-model="account" placeholder="用户名" size="default" clearable></el-input>
        <el-input v-model="password" placeholder="密码" type="password" size="default" clearable></el-input>
        <el-button type="primary" size="default" @click="onLogin">登录</el-button>
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script setup lang='ts'>
import { useAuthStore } from '@/stores/modules/auth';

const router = useRouter();
const authStore = useAuthStore();

const account = ref('');
const password = ref('');
const error = ref('');

async function onLogin() {
  try {
    const result = await authStore.login(account.value, password.value);
    if (result) {
      router.push({ name: 'home' });  // 导航到主页
    }
  } catch (err) {
    error.value = err.message;
  }
}
</script>

<style lang="scss">
.login-container {
    @apply flex flex-col items-center justify-center min-h-screen;

    .el-input,
    .el-button {
        @apply mb-5 w-72; // margin-bottom: 20px; width: 18rem;
    }

    .el-button {
        @apply mt-2.5; // margin-top: 10px;
    }
}
</style>
