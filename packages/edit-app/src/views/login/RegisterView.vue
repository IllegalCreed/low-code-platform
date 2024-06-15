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

    <div flex flex-row items-center mt-2 w-70 text-3 space-x-2>
      <span>已经注册但未激活？</span>
      <neumorphism-link @click="router.push({ name: 'resend' })"> 去激活 </neumorphism-link>
    </div>

    <tool-bar absolute top-4 right-8></tool-bar>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { useUserStore } from '@/stores/modules/user'
import { toTypedSchema } from '@vee-validate/yup'
import { useValidateCatch } from '@/composables/validateCatch'

const { t } = useI18n()
const {
  register: registerAction,
  usernameCheck: usernameCheckAction,
  emailCheck: emailCheckAction
} = useUserStore()
const { checkCatch } = useValidateCatch()
const serverError = ref('')

const { handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      username: yup
        .string()
        .required(() => t('accountValidate.usernameRequiredError'))
        .test(
          'unique-username',
          () => t('accountValidate.usernameUniqueError'),
          async (value, context) => {
            /** NOTE: yup的test会在任何一个字段触发验证时执行全部字段的test，
             * 有的解释是有可能该字段的自定义验证方法可能依赖其他字段，
             * 所以这里为了性能考虑我们需要排除一些无效调用
             * 原本打算在value变化并且其他验证都通过时再进行异步操作，
             * 但目前明显办不到，因为所有验证是同时进行的。
             */
            return await checkCatch<string>(value, context.path, () => {
              return usernameCheckAction(value)
            })
          }
        )
        .default(''),
      email: yup
        .string()
        .email(() => t('accountValidate.emailValidError'))
        .required(() => t('accountValidate.emailRequiredError'))
        .test(
          'unique-email',
          () => t('accountValidate.emailUniqueError'),
          async (value, context) => {
            return await checkCatch<string>(value, context.path, () => {
              return emailCheckAction(value)
            })
          }
        )
        .default(''),
      password: yup
        .string()
        .required(() => t('accountValidate.passwordRequiredError'))
        .matches(/.{8,}/, () => t('accountValidate.passwordLengthError'))
        .matches(/[A-Z]/, () => t('accountValidate.passwordUppercaseError'))
        .matches(/[a-z]/, () => t('accountValidate.passwordLowercaseError'))
        .matches(/\d/, () => t('accountValidate.passwordNumberError'))
        .matches(/[@$!%*?&]/, () => t('accountValidate.passwordSpecialCharError'))
        .default(''),
      isAgree: yup
        .boolean()
        .oneOf([true], () => t('accountValidate.termsAgreementError'))
        .default(false)
    })
  )
})
const [username, usernameAttrs] = defineField('username', (state) => ({
  props: {
    error: state.errors[0]
  },
  validateOnModelUpdate: false
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
  validateOnModelUpdate: false
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

    // NOTE：margin-top属性如果设置为百分比，则针对的是容器的宽度
    @media (max-width: $xl3) {
      @apply mt-1/4;
    }
  }

  .description {
    @apply text-3 mb-8;
    color: var(--text-ignore-color);
  }

  #register-btn,
  .account-input {
    @apply w-72;
  }

  .account-input {
    @apply mb-8;
  }
}

.error-message {
  color: $red-500;
  @apply inline text-3 h-4;
}
</style>
