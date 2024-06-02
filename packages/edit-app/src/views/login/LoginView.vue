<template>
  <div class="login-root-container">
    <tool-bar absolute top-4 right-4></tool-bar>
    <div class="login-banner-container">
      <!-- NOTE: background-clip:text 和 其他有背景色的东西叠加在一起，再做个动画效果，safari就整不会了 -->
      <blur-ball v-if="!isSafari" absolute top="60%" left="60%" w="40%"></blur-ball>
      <typed-text :strings="slogan" absolute top="25%" w="80%"></typed-text>
    </div>
    <div class="login-main-container">
      <el-input v-model="account" placeholder="用户名" size="default" clearable></el-input>
      <el-input
        v-model="password"
        placeholder="密码"
        type="password"
        size="default"
        clearable
      ></el-input>
      <neumorphism-button id="login-btn" @click="onLogin">{{
        $t('common.login')
      }}</neumorphism-button>
      <div v-if="error">{{ error }}</div>
      <dark-mode-switch />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth'
import { isSafari } from '@/utils/platform'
const { t } = useI18n()

const slogan = computed(() => [t('slogan.slogan1'), t('slogan.slogan2'), t('slogan.slogan3')])

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
  @apply relative overflow-hidden;
  @apply flex-1 flex flex-col justify-center items-center;
  @apply rounded-2 min-w-0 p-8;
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
