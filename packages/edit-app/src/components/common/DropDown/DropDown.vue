<template>
  <div
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    class="dropdown-root-container"
  >
    <div cursor-pointer>
      <slot></slot>
    </div>
    <div class="popup" :class="{ visible: isPopupVisible }">
      <span class="current" v-if="props.current">{{ props.current?.content }}</span>
      <drop-down-menu :items="props.items"></drop-down-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    current?: Item
    items: Item[]
    hoverable?: boolean
  }>(),
  {
    hoverable: true
  }
)

const emit = defineEmits<{
  onItemClick: [key: string]
}>()

provide('itemClickHandle', (key: string) => {
  emit('onItemClick', key)
})

const isPopupVisible = ref(false)

const showPopup = () => {
  isPopupVisible.value = true
}

const hidePopup = () => {
  isPopupVisible.value = false
}

const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value
}

const handleMouseOver = () => {
  if (props.hoverable) {
    showPopup()
  }
}

const handleMouseLeave = () => {
  if (props.hoverable) {
    hidePopup()
  }
}

const handleClick = () => {
  if (!props.hoverable) {
    togglePopup()
  }
}
</script>

<style lang="scss" scoped>
.dropdown-root-container {
  @apply relative;
  @apply h-8;
  @apply flex items-center justify-center;

  .popup {
    @apply flex flex-col;
    @apply absolute right-0 top-8;
    @apply p-4 w-max;
    @apply opacity-0 invisible;
    @apply -translate-y-1;
    @apply rounded-2;
    @include neumorphism-card(0.25rem);
    transition:
      opacity 0.25s,
      visibility 0.25s,
      transform 0.25s;
  }

  .visible {
    @apply opacity-100 visible translate-y-0;
  }

  .current {
    @apply block;
    @apply select-none font-bold;
    @apply my-2 mx-4;
    color: var(--text-active-color);
  }
}
</style>
