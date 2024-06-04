<template>
  <div :class="['input-wrapper', isFocused ? 'focus' : null]">
    <input
      @focusin="isFocused = true"
      @focusout="isFocused = false"
      :type="props.type"
      :placeholder="props.placeholder"
      v-model="modelValue"
    />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    type?: string
    placeholder?: string
  }>(),
  {
    type: 'text',
    placeholder: ''
  }
)

const modelValue = defineModel<string>('modelValue')

const isFocused = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.input-wrapper {
  @apply flex flex-row;
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
}

.focus {
  @include neumorphism-all-shadow(0.25rem);
}
</style>
