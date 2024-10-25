export function useOrientation() {
  const isPortrait = ref(false);

  const checkOrientation = () => {
    isPortrait.value = window.matchMedia('(max-width: 768px)').matches;
  };

  onMounted(() => {
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkOrientation);
  });

  return { isPortrait };
}
