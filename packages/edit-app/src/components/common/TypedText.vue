<template>
  <span class="typed-text">{{ displayText }}</span>
</template>

<script setup lang="ts">
import { linear, easeInQuad } from '@/utils/ease'

const props = withDefaults(
  defineProps<{
    strings: string[]
    totalTypeDuration?: number
    totalDeleteDuration?: number
    betweenInterval?: number
    loop?: boolean
    typingEasing?: Function
    deletingEasing?: Function
  }>(),
  {
    strings: () => [],
    totalTypeDuration: 2000,
    totalDeleteDuration: 1500,
    betweenInterval: 2000,
    loop: true,
    typingEasing: easeInQuad,
    deletingEasing: linear
  }
)

const displayText = ref('')
let stringArrayIndex = 0
let charIndex = 0
let isDeleting = false
let lastTime = 0
let timeoutId = 0

// NOTE: 小技巧，如果不能直接watch prop，请把它装进一个computed里。也可以用toRef()，或者用toRefs()包装所有props
const strings = computed(() => props.strings)
watch(strings, () => {
  clear()
  type()
})

onMounted(() => {
  type()
})

onBeforeUnmount(() => {
  clear()
})

function clear() {
  displayText.value = ''
  isDeleting = false
  charIndex = 0
  lastTime = 0
  if (timeoutId !== 0) {
    clearTimeout(timeoutId) // 释放激活的定时器
  }
}

function type() {
  if (!props.strings) return
  // console.log('setTimeOut need to be released')
  const currentString = props.strings[stringArrayIndex % props.strings.length]
  const progress = charIndex / currentString.length
  const totalDuration = isDeleting ? props.totalDeleteDuration : props.totalTypeDuration
  const easeFunction = isDeleting ? props.deletingEasing : props.typingEasing
  const adjustedProgress = easeFunction(progress)
  const adjustedTime = adjustedProgress * totalDuration
  const nextInterval = Math.max(0, isDeleting ? lastTime - adjustedTime : adjustedTime - lastTime)
  lastTime = adjustedTime

  /* NOTE: 这里需要用window.setTimeout，因为ts不知道你用的是node的还是哪个，会在build时候给你报错 */
  timeoutId = window.setTimeout(() => {
    displayText.value = isDeleting
      ? currentString.substring(0, --charIndex)
      : currentString.substring(0, ++charIndex)

    if (charIndex === 0 || charIndex === currentString.length) {
      timeoutId = window.setTimeout(() => {
        isDeleting = !isDeleting
        if (!isDeleting) {
          stringArrayIndex = (stringArrayIndex + 1) % props.strings.length
          if (!props.loop && stringArrayIndex === 0) {
            return
          }
        }
        type()
      }, props.betweenInterval)
    } else {
      type()
    }
  }, nextInterval)
}
</script>

<style lang="scss" scoped>
@use '/src/styles/_common.scss' as *;

.typed-text {
  @apply block;
  @apply whitespace-pre-wrap break-words;
  @apply text-16 font-bold text-transparent;
  /* NOTE: background-clip: text一定要在background之后设置才能生效，我不确定这是为什么*/
  @include background-colorful;
  @apply bg-clip-text;

  /* 光标 */
  &::after {
    content: '';
    @apply inline-block ml-1 w-1 h-1em;
    @apply align-middle;
    background-color: var(--text-color); /* 光标颜色 */
    animation: blink 1s step-end infinite; /* 闪烁动画 */
  }
}
</style>
