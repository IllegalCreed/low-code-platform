<template>
  <div class="register-root-container">
    <!-- NOTE: router-view的Transition只能给单一根节点组件添加过渡效果，我惊呆了，他让我指定一个元素作为附加过渡效果也行呀，直接不支持，厉害 -->
    <!-- NOTE: 如果注释加载根节点上则过渡失效，第二页不显示 -->
    <!-- NOTE: https://github.com/vuejs/core/pull/7387 有人解决了，但PR还卡着呢 -->
    <span class="title">{{ t('account.signUp').toUpperCase() }}</span>
    <span class="description">{{ t('account.createAccount') }}</span>

    <neumorphism-input
      class="account-input"
      v-model="account"
      :placeholder="t('account.account')"
      clearable
    ></neumorphism-input>
    <neumorphism-input
      class="account-input"
      v-model="email"
      :placeholder="t('account.email')"
      clearable
    ></neumorphism-input>
    <neumorphism-input
      class="account-input"
      v-model="password"
      :placeholder="t('account.password')"
      type="password"
      clearable
      show-password
    ></neumorphism-input>
    <div flex flex-row items-center mt-4 w-70 text-3>
      <neumorphism-checkbox
        >{{ t('account.agree') }}
        <neumorphism-link ml-1 href="/policy">{{ t('account.privacy') }}</neumorphism-link>
      </neumorphism-checkbox>
    </div>
    <span class="error">{{ error }}</span>
    <neumorphism-button id="register-btn" @click="onRegister">{{
      t('account.register')
    }}</neumorphism-button>

    <div flex flex-row items-center mt-4 w-70 text-3 space-x-2>
      <span>{{ t('account.haveAccount') }}</span>
      <neumorphism-link @click="router.push({ name: 'login' })">{{
        t('account.signIn')
      }}</neumorphism-link>
    </div>

    <tool-bar absolute top-4 right-8></tool-bar>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const account = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()

function onRegister() {}
</script>

<style lang="scss" scoped>
.register-root-container {
  @apply flex flex-col items-center justify-center;
  @apply p-8 min-h-screen;

  @media (max-width: $xl3) {
    @apply flex-col justify-start min-h-0;
  }

  .title {
    @apply text-8 mb-1 font-semibold;

    @media (max-width: $xl3) {
      @apply mt-1/3;
    }
  }

  .description {
    @apply text-3 mb-6;
    color: var(--text-ignore-color);
  }

  #register-btn,
  .account-input {
    @apply w-72;
  }

  .account-input {
    @apply mt-5;
  }
}

.error {
  color: $red-500;
  @apply inline text-3 my-3 h-4;
}
</style>
