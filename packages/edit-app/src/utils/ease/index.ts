export { easeInQuad, easeOutQuad, easeInOutQuad } from './quad';
export { easeInQuart, easeOutQuart, easeInOutQuart } from './quart';
export { easeInQuint, easeOutQuint, easeInOutQuint } from './quint';
export { easeInSine, easeOutSine, easeInOutSine } from './sine';
export { easeInCirc, easeOutCirc, easeInOutCirc } from './circular';
export { easeInCubic, easeOutCubic, easeInOutCubic } from './cubic';
export { easeInExpo, easeOutExpo, easeInOutExpo } from './exponential';
export { easeInBack, easeOutBack, easeInOutBack } from './back';

export function linear(t: number): number {
  return t;
}
