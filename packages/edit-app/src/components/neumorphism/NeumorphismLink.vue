<template>
  <a :href="props.href" :target="props.target" :rel="relAttribute" class="link">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    href?: string
    target?: string
  }>(),
  {
    href: undefined,
    target: undefined
  }
)

const relAttribute = computed(() => {
  /* NOTE: 只有当target="_blank"时，才会有window.opener属性，才需要设置安全头 */
  if (props.target === '_blank') {
    return 'noopener noreferrer'
  }
  return undefined
})
</script>

<style lang="scss" scoped>
.link {
  color: var(--link-color);
  @apply text-3 cursor-pointer;

  &:hover {
    color: var(--link-hover-color);
    @apply underline;
  }
}
</style>
