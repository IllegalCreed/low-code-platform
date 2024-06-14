<template>
  <div class="register-root-container">
    <!-- NOTE: router-view的Transition只能给单一根节点组件添加过渡效果，我惊呆了，他让我指定一个元素作为附加过渡效果也行呀，直接不支持，厉害 -->
    <!-- NOTE: 如果注释加载根节点上则过渡失效，第二页不显示 -->
    <!-- NOTE: https://github.com/vuejs/core/pull/7387 有人解决了，但PR还卡着呢 -->
    <span class="title">{{ t('account.signUp').toUpperCase() }}</span>
    <span class="description">{{ t('account.createAccount') }}</span>

    <neumorphism-input
      class="account-input"
      v-model="username"
      :placeholder="t('account.account')"
      clearable
      v-bind="usernameAttrs"
    ></neumorphism-input>
    <neumorphism-input
      class="account-input"
      v-model="email"
      :placeholder="t('account.email')"
      type="email"
      clearable
      v-bind="emailAttrs"
    ></neumorphism-input>
    <neumorphism-input
      class="account-input"
      v-model="password"
      :placeholder="t('account.password')"
      type="password"
      clearable
      show-password
      v-bind="passwordAttrs"
    ></neumorphism-input>
    <div flex flex-row items-center mb-7 w-70 text-3>
      <neumorphism-checkbox v-model="isAgree" v-bind="isAgreeAttrs"
        >{{ t('account.agree') }}
        <neumorphism-link ml-1 href="/policy">{{ t('account.privacy') }}</neumorphism-link>
      </neumorphism-checkbox>
    </div>
    <span class="error-message">{{ serverError }}</span>
    <neumorphism-button id="register-btn" @click="onRegister" :loading="isSubmitting">{{
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
import * as yup from 'yup'
import { useUserStore } from '@/stores/modules/user'
import { toTypedSchema } from '@vee-validate/yup'

const { t } = useI18n()
const {
  register: registerAction,
  usernameCheck: usernameCheckAction,
  emailCheck: emailCheckAction
} = useUserStore()
const serverError = ref('')

const { handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      username: yup
        .string()
        .required('Username is required')
        .test(
          'unique-username',
          'Username is already taken',
          async (value) => await usernameCheckAction(value)
        )
        .default(''),
      email: yup
        .string()
        .email('Email must be a valid email')
        .required('Email is required')
        .test(
          'unique-email',
          'Email is already registered',
          async (value) => await emailCheckAction(value)
        )
        .default(''),
      password: yup
        .string()
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &).'
        )
        .default(''),
      isAgree: yup.boolean().oneOf([true], 'You must agree to the terms').default(false)
    })
  )
})
const [username, usernameAttrs] = defineField('username', (state) => ({
  props: {
    error: state.errors[0]
  },
  validateOnModelUpdate: state.errors.length > 0
}))
const [password, passwordAttrs] = defineField('password', (state) => ({
  /** NOTE: 这个函数调用非常频繁
   * 用来给你的组件附加更多props或者attrs
   * 当然你直接写到组件上也OK，但是这不composables
   * 我们只想让验证逻辑集中管理，让组件看起来和单独使用无异 */
  props: {
    error: state.errors[0]
  },
  validateOnModelUpdate: state.errors.length > 0
}))
const [email, emailAttrs] = defineField('email', (state) => ({
  props: {
    error: state.errors[0]
  },
  validateOnModelUpdate: state.errors.length > 0
}))
const [isAgree, isAgreeAttrs] = defineField('isAgree', {
  props: (state) => {
    return { error: state.errors[0] }
  }
})

const router = useRouter()

const onRegister = handleSubmit(async (values) => {
  try {
    await registerAction({
      username: values.username,
      password: values.password,
      email: values.email
    })
  } catch (err) {
    // Handle registration error
  }
})
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
    @apply text-3 mb-7;
    color: var(--text-ignore-color);
  }

  #register-btn,
  .account-input {
    @apply w-72;
  }

  .account-input {
    @apply mb-7;
  }
}

.error-message {
  color: $red-500;
  @apply inline text-3 h-4;
}

span {
  display: block;
}
</style>
