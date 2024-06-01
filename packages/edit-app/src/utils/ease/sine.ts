// 缓入
export function easeInSine(t: number): number {
  return 1 - Math.cos((t * Math.PI) / 2)
}
// 缓出
export function easeOutSine(t: number): number {
  return Math.sin((t * Math.PI) / 2)
}
// 缓入缓出
export function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2
}
