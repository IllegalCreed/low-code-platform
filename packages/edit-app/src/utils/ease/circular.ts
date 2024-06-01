// 缓入
export function easeInCirc(t: number): number {
  return 1 - Math.sqrt(1 - t * t)
}
// 缓出
export function easeOutCirc(t: number): number {
  return Math.sqrt(1 - Math.pow(t - 1, 2))
}
// 缓入缓出
export function easeInOutCirc(t: number): number {
  return t < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
}
