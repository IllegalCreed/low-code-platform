import { calculateGrayscaleValue, adjustColorLightness, setCssVar } from '@/utils/color'
import { exponentialMapping } from '@/utils/math'
import {
  VAR_SHADOW_INNER_LIGHT,
  VAR_PAGE_BACKGROUND_COLOR,
  VAR_PAGE_BACKGROUND_COLOR_LIGHTEN,
  VAR_PAGE_BACKGROUND_COLOR_DARKEN
} from '@/styles/cssVariables'

export const isDarkMode = useDark()

watch(
  isDarkMode,
  async () => {
    /* 每次isDarkMode变化，到CSS应用需要等待一个渲染周期完成 */
    await nextTick()
    const grayScale = calculateGrayscaleValue(VAR_PAGE_BACKGROUND_COLOR)
    /* 做一次指数映射，说白了就是阴影和高亮不要太白了，稍微暗一些 */
    const targetValue = exponentialMapping(grayScale)
    setCssVar(VAR_SHADOW_INNER_LIGHT, targetValue)
    setCssVar(
      VAR_PAGE_BACKGROUND_COLOR_LIGHTEN,
      adjustColorLightness(VAR_PAGE_BACKGROUND_COLOR, 10)
    )
    setCssVar(
      VAR_PAGE_BACKGROUND_COLOR_DARKEN,
      adjustColorLightness(VAR_PAGE_BACKGROUND_COLOR, -10)
    )
  },
  { immediate: true }
)

export function useToggleDark(event: MouseEvent) {
  /** 过滤ts错误 */
  // @ts-expect-error experimental API
  if (!document.startViewTransition) {
    isDarkMode.value = !isDarkMode.value
    return
  }

  // 获取点击位置
  const x = event.clientX
  const y = event.clientY
  // 获取到最远角的距离
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  // 开始一次视图过渡：
  // @ts-expect-error experimental API
  const transition = document.startViewTransition(async () => {
    isDarkMode.value = !isDarkMode.value
    await nextTick()
  })

  // 等待伪元素创建完成：
  transition.ready.then(() => {
    const clipPath: string[] = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]
    /**
     * 新视图的根元素动画
     * 如果是暗黑模式，则起始是大圆，结束是鼠标点击位置
     * 如果是暗黑模式，则截图的伪元素是旧元素
     * */
    document.documentElement.animate(
      {
        clipPath: isDarkMode.value ? [...clipPath].reverse() : clipPath
      },
      {
        duration: 500,
        easing: 'ease-out',
        // 指定要附加动画的伪元素
        pseudoElement: isDarkMode.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)'
      }
    )
  })
}
