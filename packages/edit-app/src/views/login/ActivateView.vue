<template>
  <div class="activate-root-container">
    <span class="title">{{ t('account.activateAccount').toUpperCase() }}</span>
    <div v-if="hasToken">
      <div v-if="activating" class="description">
        <span>{{ t('account.activating') }}</span>
        <i-eos-icons:loading ml-2></i-eos-icons:loading>
      </div>
      <div v-else>
        <div v-if="activateSucceed" class="description">
          <span>{{ t('account.activationSuccessful') }}</span
          ><neumorphism-link style="font-size: 0.875rem" @click="router.push({ name: 'login' })">{{
            t('account.signIn')
          }}</neumorphism-link>
        </div>
        <div v-else class="description">
          <span> {{ t('account.activationCodeExpired') }}</span
          ><neumorphism-link style="font-size: 0.875rem" @click="router.push({ name: 'resend' })">
            {{ t('account.resendActivationEmail') }}
          </neumorphism-link>
        </div>
      </div>
    </div>
    <div v-else class="description">
      <span>{{ t('account.checkYourEmailForActivation') }}</span>
    </div>
    <div flex flex-row items-center mt-4 text-3 space-x-2>
      <span>{{ t('account.alreadyActivated') }}</span>
      <neumorphism-link @click="router.push({ name: 'login' })">{{
        t('account.signIn')
      }}</neumorphism-link>
    </div>

    <tool-bar absolute top-4 right-8></tool-bar>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const { activate: activateAction } = useUserStore();

const hasToken = ref(false);
const activating = ref(true);
const activateSucceed = ref(false);

onMounted(() => {
  hasToken.value = !!route.query.token;
  if (hasToken.value) {
    activateAccount(route.query.token as string);
  } else {
    activating.value = false;
  }
});

async function activateAccount(token: string) {
  try {
    activating.value = true;
    await activateAction(token);
    activating.value = false;
    activateSucceed.value = true;
  } catch (error) {
    activating.value = false;
    activateSucceed.value = false;
  }
}

// 测试用属性
// enum PageState {
//   Sended,
//   Activating,
//   ActivateSucceed,
//   ActivateFailed
// }

// const state = computed<PageState>({
//   get() {
//     if (hasToken.value === false) {
//       return PageState.Sended
//     } else if (activating.value === true) {
//       return PageState.Activating
//     } else if (activateSucceed.value === true) {
//       return PageState.ActivateSucceed
//     } else {
//       return PageState.ActivateFailed
//     }
//   },
//   set(newValue) {
//     switch (newValue) {
//       case PageState.Sended:
//         hasToken.value = false
//         activating.value = false
//         activateSucceed.value = false
//         break
//       case PageState.Activating:
//         hasToken.value = true
//         activating.value = true
//         activateSucceed.value = false
//         break
//       case PageState.ActivateSucceed:
//         hasToken.value = true
//         activating.value = false
//         activateSucceed.value = true
//         break
//       case PageState.ActivateFailed:
//         hasToken.value = true
//         activating.value = false
//         activateSucceed.value = false
//         break
//     }
//   }
// })
// state.value = PageState.Sended
// state.value = PageState.Activating
// state.value = PageState.ActivateSucceed
// state.value = PageState.ActivateFailed
</script>

<style lang="scss" scoped>
.activate-root-container {
  @apply flex flex-col items-center justify-center;
  @apply p-8 min-h-screen;

  @media (max-width: $xl3) {
    @apply flex-col justify-start min-h-0;
  }

  .title {
    @apply text-8 mb-4 font-semibold;

    @media (max-width: $xl3) {
      @apply mt-1/3;
    }
  }

  .description {
    @apply flex flex-row items-center;
    @apply text-3.5 mb-16 space-x-1;
    color: var(--text-ignore-color);
  }
}
</style>
