<template>
  <div
    :class="['checkbox-wrapper', hasError ? 'error' : null]"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    :data-error="error"
  >
    <input type="checkbox" :id="checkboxId" v-model="modelValue" @change="handleChange" />
    <!--NOTE: 为了用 :for 这里必须用label-->
    <label :for="checkboxId" class="checkbox-label">
      <span
        :class="[
          'checkbox-box',
          modelValue ? 'checked' : null,
          hasError ? 'checkbox-box-error' : null,
        ]"
      ></span>
      <span class="checkbox-text"><slot></slot></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
const emit = defineEmits<{
  changed: [value: boolean, event?: MouseEvent];
}>();

const props = defineProps<{
  id?: string;
  error?: string;
}>();

const modelValue = defineModel<boolean>({ default: false });
const isHover = ref<boolean>(false);

const checkboxId = computed(() => props.id || uuidv4());
const hasError = computed(() => {
  if (props.error) {
    return true;
  } else {
    return false;
  }
});

const handleChange = () => {
  console.log(modelValue.value);
  emit('changed', modelValue.value);
};
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  @apply flex flex-row relative;

  &:hover .checkbox-box {
    @include neumorphism-flat(0.1rem, var(--page-background-color-lighten));
  }

  .checkbox-label {
    @apply flex items-start cursor-pointer select-none space-x-2;
  }

  .checkbox-box {
    @apply w-4 h-4;
    @apply rounded-1;
    @apply transition-colors;
    @include neumorphism-convex(0.1rem);

    &.checked {
      background-color: var(--switch-active-background);
      @include neumorphism-inner-shadow(0.1rem);
    }

    &.checkbox-box-error {
      // @include neumorphism-error-shadow(0.1rem);
      outline: var(--error-shadow-color) dashed 1px;
    }
  }

  .checkbox-text {
    @apply text-3 leading-4;
  }

  input[type='checkbox'] {
    @apply hidden;
  }
}

.error::after {
  content: attr(data-error);
  color: $red-500;
  @apply absolute text-3 top-full left-1 pt-1;
}
</style>
