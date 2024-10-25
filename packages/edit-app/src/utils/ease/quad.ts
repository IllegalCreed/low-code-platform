// 缓入
export function easeInQuad(t: number): number {
  return t * t;
}
// 缓出
export function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}
// 缓入缓出
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
