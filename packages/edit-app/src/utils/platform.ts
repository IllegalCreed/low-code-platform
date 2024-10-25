export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export function isMobile() {
  const userAgent = navigator.userAgent || navigator.vendor;
  return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}
