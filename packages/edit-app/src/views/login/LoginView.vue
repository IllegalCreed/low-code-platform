<template>
  <div class="login-root-container">
    <div class="login-banner-container">
      <!-- NOTE: background-clip:text 和 其他有背景色的东西叠加在一起，再做个动画效果，safari就整不会了 -->
      <blur-ball v-if="!isSafari" absolute top="60%" left="60%" w="40%"></blur-ball>
      <typed-text :strings="slogan" absolute top="25%" w="80%"></typed-text>
    </div>
    <div class="login-main-container">
      <h1>{{ t('common.welcome') }}</h1>
      <neumorphism-input
        class="account-input"
        v-model="account"
        :placeholder="t('common.account')"
        clearable
      ></neumorphism-input>
      <neumorphism-input
        class="account-input"
        v-model="password"
        :placeholder="t('common.password')"
        type="password"
        clearable
        show-password
      ></neumorphism-input>
      <span class="error">{{ error }}</span>
      <neumorphism-button id="login-btn" @click="onLogin">{{
        t('common.login')
      }}</neumorphism-button>
    </div>
    <tool-bar absolute top-4 right-8></tool-bar>
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
  @apply flex flex-row items-stretch justify-stretch;
  @apply p-8 min-h-screen;

  @media (max-width: $xl3) {
    @apply flex-col min-h-0;
  }
}
.login-banner-container {
  @apply relative overflow-hidden;
  @apply flex-1 flex flex-col justify-center items-center;
  @apply rounded-2 min-w-0 p-8;
  @include neumorphism-glass-shadow(0.25rem);

  @media (max-width: $xl3) {
    @apply h-80 flex-none;
    @apply mt-10;

    span {
      @apply text-8;
    }
  }
}
.login-main-container {
  @apply flex-1 flex flex-col items-center justify-center;

  @media (max-width: $xl3) {
    @apply mt-4 mb-80 flex-none;
  }

  #login-btn,
  .account-input {
    @apply w-72;
  }

  .account-input {
    @apply mt-5;
  }
}

.error {
  color: $red-500;
  @apply inline text-3 my-5 h-4;
}
</style>
