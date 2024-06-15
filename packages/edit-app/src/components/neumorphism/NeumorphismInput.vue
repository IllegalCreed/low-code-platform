<template>
  <div
    :class="['input-wrapper', isFocused ? 'focus' : null, hasError ? 'error' : null]"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    :data-error="error"
  >
    <!--NOTE: 这里添加blur事件是为了触发vee-validate的验证，否则他只监听根元素的blur事件 -->
    <input
      :id="inputId"
      @focusin="isFocused = true"
      @focusout="isFocused = false"
      :type="currentType"
      :placeholder="placeholder"
      v-model="modelValue"
      @blur="emit('blur')"
    />
    <label class="icon-wrapper" :for="inputId">
      <i-mdi:close-circle-outline
        v-if="clearable && modelValue && isHover"
        class="clear-icon"
        @click="clearInput"
      ></i-mdi:close-circle-outline>
      <template v-if="showPassword && type === 'password' && modelValue">
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

const emit = defineEmits<{
  blur: []
}>()

const props = withDefaults(
  defineProps<{
    id?: string
    type?: string
    placeholder?: string
    clearable?: boolean
    showPassword?: boolean
    error?: string
  }>(),
  {
    type: 'text',
    placeholder: '',
    clearable: false,
    showPassword: false,
    error: ''
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
const hasError = computed(() => {
  if (props.error) {
    return true
  } else {
    return false
  }
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
  @apply flex flex-row relative;
  @apply rounded-2 border-0;
  @apply transition-shadow;
  @include neumorphism-input(0.25rem);

  &:hover {
    @include neumorphism-input(0.25rem, var(--page-background-color-lighten));
  }

  &.focus:hover {
    @include neumorphism-all-shadow(0.25rem);
  }

  /** 错误效果可以在拟物和扁平间切换，目前拟物效果不好，所以先用扁平
   *  还有一个原因，error的shadow和focus的shadow无法共存，我选择error让位
   *  当然如果你喜欢拟物风格，你可以自行切换
   */
  &.error {
    // @include neumorphism-error-shadow(0.25rem);
    outline: var(--error-shadow-color) dashed 1px;
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

.error::after {
  content: attr(data-error);
  color: $red-500;
  @apply absolute text-3 top-full left-1 pt-1;
}
</style>
