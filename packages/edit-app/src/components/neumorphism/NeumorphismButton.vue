<template>
  <button
    :class="['button', props.disabled ? 'disabled' : null, props.loading ? 'loading' : null]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <i-eos-icons:loading v-if="loading" mr-2></i-eos-icons:loading>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    disabled: false,
    loading: false,
  },
);

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<style lang="scss" scoped>
.button {
  @apply px-4 py-2;
  @apply rounded-2 border-0;
  @apply font-medium;
  @apply flex flex-row justify-center items-center;
  @include neumorphism-btn(0.25rem);

  &.disabled {
    @apply cursor-not-allowed;
    color: var(--disabled-color);
    background-color: var(--disabled-background);
  }

  &.loading {
    @apply cursor-not-allowed;
  }
}
</style>
