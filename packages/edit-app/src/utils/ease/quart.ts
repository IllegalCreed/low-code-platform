// 缓入
export function easeInQuart(t: number): number {
  return t * t * t * t;
}
// 缓出
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}
// 缓入缓出
export function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}
