export function getRandomColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}

export const getCssVar = (prop: string, dom: Element = document.documentElement): string => {
  return window.getComputedStyle(dom).getPropertyValue(prop).trim()
}

/**
 * 将十六进制颜色转换为 RGB 数组
 * @param hex - 十六进制颜色值
 * @returns RGB 数组
 */
function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.slice(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

/**
 * 将 RGB 数组转换为十六进制颜色
 * @param r - 红色分量
 * @param g - 绿色分量
 * @param b - 蓝色分量
 * @returns 十六进制颜色值
 */
function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  )
}

/**
 * 将十六进制颜色转换为 HSL 数组
 * @param hex - 十六进制颜色值
 * @returns HSL 数组
 */
function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map((x) => x / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s: number
  const l = (max + min) / 2
  if (max === min) {
    s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h! *= 60
  }
  return [h, s * 100, l * 100]
}

/**
 * 将 HSL 数组转换为十六进制颜色
 * @param h - 色相
 * @param s - 饱和度
 * @param l - 亮度
 * @returns 十六进制颜色值
 */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1)
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

/**
 * 计算颜色的灰度值（0到1之间）
 * @param colorVarName - CSS变量名
 * @returns 灰度值（0到1之间）
 */
export function calculateGrayscaleValue(cssColor: string): number {
  const [r, g, b] = hexToRgb(cssColor)
  // 计算灰度值
  const grayscale = 0.299 * r + 0.587 * g + 0.114 * b
  return grayscale / 255
}

/**
 * 调整颜色的亮度
 * @param colorVarName - CSS 变量名
 * @param percentage - 调整的百分比，正数为变亮，负数为变暗
 * @returns 调整后的十六进制颜色值
 */
export function adjustColorLightness(colorVarName: string, percentage: number): string {
  const cssColor = getCssVar(colorVarName)
  const [h, s, l] = hexToHsl(cssColor)

  const adjustedL = Math.min(100, Math.max(0, l + percentage))

  return hslToHex(h, s, adjustedL)
}
