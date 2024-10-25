<template>
  <div
    :class="['switch', { 'is-on': _value }]"
    :style="{
      backgroundColor: _value
        ? activeColor
          ? activeColor
          : undefined
        : inactiveColor
          ? inactiveColor
          : undefined,
    }"
    @click="toggle"
  >
    <div
      class="switch-slider"
      :style="{
        backgroundColor: _value
          ? activeSliderColor
            ? activeSliderColor
            : undefined
          : inactiveSliderColor
            ? inactiveSliderColor
            : undefined,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    defaultValue?: boolean;
    activeColor?: string;
    inactiveColor?: string;
    activeSliderColor?: string;
    inactiveSliderColor?: string;
  }>(),
  {
    defaultValue: false,
  },
);

const modelValue = defineModel<boolean>({ default: undefined });

const emit = defineEmits<{
  changed: [value: boolean, event?: MouseEvent];
}>();

const _value = ref(modelValue.value ?? props.defaultValue);
let isInternalChange = false;

watch(
  () => modelValue.value,
  (newValue) => {
    if (newValue !== undefined && !isInternalChange) {
      _value.value = newValue;
      emit('changed', newValue);
    }
  },
);

const toggle = async (event: MouseEvent) => {
  isInternalChange = true;
  const newValue = !_value.value;
  if (modelValue.value !== undefined) {
    modelValue.value = newValue;
  }
  _value.value = newValue;
  emit('changed', newValue, event);
  await nextTick();
  isInternalChange = false;
};
</script>

<style lang="scss" scoped>
.switch {
  @apply w-9 h-5;
  @apply rounded-full;
  @apply cursor-pointer;
  @apply flex flex-row items-center;
  @apply transition-colors;
  @include neumorphism-switch(0.1rem);
  background-color: var(--switch-inactive-background);
}

.switch.is-on {
  background-color: var(--switch-active-background);
}

.switch-slider {
  @apply w-4 h-4;
  @apply rounded-full;
  @apply transition-all;
  @apply flex items-center justify-center;
  @apply translate-x-0.5;
  background-color: var(--switch-thumb-inactive-background);
}

.switch.is-on .switch-slider {
  background-color: var(--switch-thumb-active-background);
  @apply translate-x-4.5;
}
</style>
