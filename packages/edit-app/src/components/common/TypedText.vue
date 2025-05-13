<template>
  <span class="typed-text">{{ displayText }}</span>
</template>

<script setup lang="ts">
import { linear, easeInQuad } from '@/utils/ease';

/**
 * TypedText 组件的属性定义，用于实现打字机效果。
 */
interface Props {
  /**
   * 要展示的字符串数组。
   */
  strings: string[];

  /**
   * 打字一个字符串的总时长，单位为毫秒。
   * @default 2000
   */
  totalTypeDuration?: number;

  /**
   * 删除一个字符串的总时长，单位为毫秒。
   * @default 1500
   */
  totalDeleteDuration?: number;

  /**
   * 打字和删除之间的暂停时长，单位为毫秒。
   * @default 2000
   */
  betweenInterval?: number;

  /**
   * 是否无限循环展示字符串。
   * @default true
   */
  loop?: boolean;

  /**
   * 打字动画的缓动函数，接收进度值（0 到 1）并返回调整后的进度。
   * @default easeInQuad
   */
  typingEasing?: (t: number) => number;

  /**
   * 删除动画的缓动函数，接收进度值（0 到 1）并返回调整后的进度。
   * @default linear
   */
  deletingEasing?: (t: number) => number;
}

/**
 * 使用 Props 接口定义组件属性，并设置默认值。
 */
const props = withDefaults(defineProps<Props>(), {
  strings: () => [],
  totalTypeDuration: 2000, // 默认打字 2 秒
  totalDeleteDuration: 1500, // 默认删除 1.5 秒
  betweenInterval: 2000, // 默认暂停 2 秒
  loop: true, // 默认循环
  typingEasing: easeInQuad, // 默认打字使用 easeInQuad 缓动
  deletingEasing: linear, // 默认删除使用线性缓动
});

// 当前显示的文本
const displayText = ref(''); 

// 当前字符串在 strings 数组中的索引
let stringArrayIndex = 0;

// 当前字符串的字符索引
let charIndex = 0;

// 当前是否处于删除状态
let isDeleting = false;

// 动画开始的时间戳
let startTime = 0;

// requestAnimationFrame 的 ID，用于取消动画
let rafId = 0;

// 存储 setTimeout 的 ID，用于清理
const timeoutIds = ref<number[]>([]);

// NOTE: 小技巧，如果不能直接watch prop，请把它装进一个computed里。也可以用toRef()，或者用toRefs()包装所有props
const strings = computed(() => props.strings);
watch(strings, () => {
  clear();
  type();
});

/**
 * 组件挂载时开始动画。
 */
onMounted(() => {
  type();
});

/**
 * 组件卸载前清理动画。
 */
onBeforeUnmount(() => {
  clear();
});

/**
 * 清理动画状态，取消所有定时器和动画帧。
 */
function clear() {
  // 清空显示文本
  displayText.value = '';

  // 重置删除状态
  isDeleting = false;

  // 重置字符索引
  charIndex = 0;

  // 重置动画开始时间
  startTime = 0;

  // 取消 requestAnimationFrame
  if (rafId !== 0) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }

  // 取消所有 setTimeout
  timeoutIds.value.forEach((id) => clearTimeout(id));

  // 清空 timeoutIds 数组
  timeoutIds.value = [];
}

/**
 * 核心动画函数，使用 requestAnimationFrame 实现打字和删除效果。
 */
function type() {
  // 如果字符串数组为空或不存在，直接返回
  if (!props.strings || props.strings.length === 0) return;

  // 获取当前字符串，因为如果循环开启的话 stringArrayIndex 会超过数组长度，所以需要取模
  const currentString = props.strings[stringArrayIndex % props.strings.length];
  // 根据是否删除选择动画时长
  const totalDuration = isDeleting ? props.totalDeleteDuration : props.totalTypeDuration;
  // 根据是否删除选择缓动函数
  const easeFunction = isDeleting ? props.deletingEasing : props.typingEasing;

  /**
   * 动画循环函数，基于时间戳更新文本显示。
   * @param currentTime 当前时间戳，由 requestAnimationFrame 提供
   */
  const animate = (currentTime: number) => {
    // 如果是动画第一帧，记录开始时间
    if (!startTime) startTime = currentTime;

    // 计算经过时间
    const elapsed = currentTime - startTime;
    // 计算动画进度（0 到 1），确保不超过 1
    const progress = Math.min(elapsed / totalDuration, 1);
    // 应用缓动函数调整进度
    const easedProgress = easeFunction(progress);
    // 根据缓动进度计算目标字符索引
    const targetCharIndex = Math.round(easedProgress * currentString.length);

    // 更新字符索引和显示文本
    charIndex = isDeleting
      ? Math.max(0, currentString.length - targetCharIndex) // 删除时减少字符
      : Math.min(currentString.length, targetCharIndex); // 打字时增加字符
    displayText.value = currentString.substring(0, charIndex);

    // 如果动画未完成，继续下一帧
    if (progress < 1) {
      // 继续动画
      rafId = requestAnimationFrame(animate); // 调度下一帧
    } else {
      // 动画完成，进入暂停或切换状态
      startTime = 0;

      // 如果到达字符串开头或结尾
      if (charIndex === 0 || charIndex === currentString.length) {

        // 使用 setTimeout 实现暂停效果
        const timeoutId = window.setTimeout(() => {
          // 切换打字/删除状态
          isDeleting = !isDeleting;
          if (!isDeleting) {
            // 切换到下一个字符串
            stringArrayIndex = (stringArrayIndex + 1) % props.strings.length;
            // 如果不循环且回到第一个字符串，停止动画
            if (!props.loop && stringArrayIndex === 0) {
              return;
            }
          }
          // 开始下一次动画
          type();
        }, props.betweenInterval);
        timeoutIds.value.push(timeoutId);
      } else {
        // 继续动画（理论上不会到达这里，因为 progress >= 1）
        rafId = requestAnimationFrame(animate);
      }
    }
  };

  // 启动动画
  rafId = requestAnimationFrame(animate);
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
    background-color: var(--text-color, #000); /* 光标颜色 */
    animation: blink 1s step-end infinite; /* 闪烁动画 */
  }
}
</style>
