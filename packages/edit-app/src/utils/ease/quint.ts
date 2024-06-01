// 缓入
export function easeInQuint(t: number): number {
  return t * t * t * t * t
}
// 缓出
export function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5)
}
// 缓入缓出
export function easeInOutQuint(t: number): number {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
}
