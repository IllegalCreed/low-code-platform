<template>
  <div class="checkbox-container">
    <input type="checkbox" :id="checkboxId" v-model="modelValue" @change="handleChange" />
    <!--NOTE: 为了用 :for 这里必须用label-->
    <label :for="checkboxId" class="checkbox-label">
      <span class="checkbox-box" :class="{ 'checkbox-box-checked': modelValue }"></span>
      <span class="checkbox-text"><slot></slot></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  id?: string
}>()

const modelValue = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  changed: [value: boolean, event?: MouseEvent]
}>()

const checkboxId = computed(() => props.id || uuidv4())

const handleChange = () => {
  emit('changed', modelValue.value)
}
</script>

<style lang="scss" scoped>
.checkbox-label {
  @apply flex items-center cursor-pointer select-none space-x-2;
}

.checkbox-box {
  @apply block;
  @apply w-4 h-4;
  @apply rounded-1;
  @apply transition-colors;
  @include neumorphism-outer-shadow(0.1rem);
}

.checkbox-box-checked {
  background-color: var(--switch-active-background);
  @include neumorphism-inner-shadow(0.1rem);
}

.checkbox-text{
    @apply text-3
}

input[type='checkbox'] {
  @apply hidden;
}
</style>
