// 缓入
export function easeInCubic(t: number): number {
  return t * t * t;
}
// 缓出
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
// 缓入缓出
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
