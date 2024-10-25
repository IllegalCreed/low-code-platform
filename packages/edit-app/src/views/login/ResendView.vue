<template>
  <div class="resend-root-container">
    <span class="title">{{ t('account.activateAccount').toUpperCase() }}</span>
    <span class="description">{{ t('account.resendActivationEmail') }}</span>

    <neumorphism-input
      class="account-input"
      v-model="email"
      :placeholder="t('account.email')"
      clearable
      v-bind="emailAttrs"
    ></neumorphism-input>

    <span class="error-message">{{ serverError }}</span>

    <neumorphism-button id="register-btn" @click="onResend" :loading="isSubmitting">{{
      t('account.send')
    }}</neumorphism-button>

    <div flex flex-row items-center mt-4 w-70 text-3 space-x-2>
      <span>{{ t('account.alreadyActivated') }}</span>
      <neumorphism-link @click="router.push({ name: 'login' })">{{
        t('account.signIn')
      }}</neumorphism-link>
    </div>

    <tool-bar absolute top-4 right-8></tool-bar>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useUserStore } from '@/stores/modules/user';
import { toTypedSchema } from '@vee-validate/yup';
import { useValidateCatch } from '@/composables/validateCatch';

const router = useRouter();
const { t } = useI18n();
const { checkCatch } = useValidateCatch();
const { emailCheck: emailCheckAction, resendActiveEmail: resendAction } = useUserStore();

const serverError = ref('');

const { handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup
        .string()
        .email(() => t('accountValidate.emailValidError'))
        .required(() => t('accountValidate.emailRequiredError'))
        .test(
          'unique-email',
          () => t('accountValidate.emailUniqueError'),
          async (value, context) => {
            return await checkCatch<string>(value, context.path, () => {
              return emailCheckAction(value);
            });
          },
        )
        .default(''),
    }),
  ),
});
const [email, emailAttrs] = defineField('email', (state) => ({
  props: {
    error: state.errors[0],
  },
  validateOnModelUpdate: false,
}));

function onResend() {
  serverError.value = '';
  handleSubmit(async (values) => {
    try {
      await resendAction(values.email);
      router.push('activate');
    } catch (err: any) {
      if (err?.msg) {
        serverError.value = err?.msg;
      }
    }
  })();
}
</script>

<style lang="scss" scoped>
.resend-root-container {
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
  color: var(--error-shadow-color);
  @apply inline text-3 mb-4 h-4;
}
</style>
