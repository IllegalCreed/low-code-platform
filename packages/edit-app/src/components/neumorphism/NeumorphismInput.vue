<template>
  <div
    :class="['input-wrapper', isFocused ? 'focus' : null]"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <input
      :id="inputId"
      @focusin="isFocused = true"
      @focusout="isFocused = false"
      :type="currentType"
      :placeholder="props.placeholder"
      v-model="modelValue"
    />
    <label class="icon-wrapper" :for="inputId">
      <i-mdi:close-circle-outline
        v-if="props.clearable && modelValue && isHover"
        class="clear-icon"
        @click="clearInput"
      ></i-mdi:close-circle-outline>
      <template v-if="props.showPassword && props.type === 'password' && modelValue">
        <i-mdi:eye-outline
          v-if="passwordVisible"
          class="toggle-password-icon"
          @click="togglePassword"
        ></i-mdi:eye-outline>
        <i-mdi:eye-off-outline
          v-else
          class="toggle-password-icon"
          @click="togglePassword"
        ></i-mdi:eye-off-outline>
      </template>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'

const props = withDefaults(
  defineProps<{
    id?: string
    type?: string
    placeholder?: string
    clearable?: boolean
    showPassword?: boolean
  }>(),
  {
    type: 'text',
    placeholder: '',
    clearable: false,
    showPassword: false
  }
)

// 生成唯一 id 或使用提供的 id
const inputId = computed(() => props.id || uuidv4())

const modelValue = defineModel<string>('modelValue')
const isFocused = ref<boolean>(false)
const isHover = ref<boolean>(false)
const passwordVisible = ref<boolean>(false)

const currentType = computed(() => {
  if (props.showPassword && props.type === 'password' && passwordVisible.value) {
    return 'text'
  }
  return props.type
})

function clearInput() {
  modelValue.value = ''
}

function togglePassword() {
  passwordVisible.value = !passwordVisible.value
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  @apply flex flex-row
  @apply rounded-2 border-0;
  @include neumorphism-input(0.25rem);

  &:hover {
    @include neumorphism-input(0.25rem, var(--page-background-color-lighten));
  }

  &.focus:hover {
    @include neumorphism-all-shadow(0.25rem);
  }

  input {
    @apply bg-transparent border-none w-full p-2;

    &:focus {
      @apply outline-none;
    }
  }

  .icon-wrapper {
    @apply flex flex-row items-center h-8;

    .clear-icon,
    .toggle-password-icon {
      @apply cursor-pointer w-4 h-4 text-gray-500 mr-2;

      &:hover {
        @apply text-gray-400;
      }
    }
  }
}

.focus {
  @include neumorphism-all-shadow(0.25rem);
}
</style>
