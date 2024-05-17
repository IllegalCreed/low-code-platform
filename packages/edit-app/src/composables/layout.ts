import { debounce } from 'lodash-es'; // 假设使用 lodash 的 debounce 函数

export function useFlexWrapCenter(cardWidth: number, cardMarginX: number, containerPaddingX: number) {
    const containerWidth = ref(0);
    const calculateWidth = debounce(() => {
        const screenWidth = window.innerWidth - (containerPaddingX * 2);
        let numberOfCards = Math.floor(screenWidth / (cardWidth + cardMarginX * 2));
        numberOfCards = Math.max(numberOfCards, 1); // 确保至少为1
        containerWidth.value = numberOfCards * (cardWidth + cardMarginX * 2) + (containerPaddingX * 2);
    }, 100); // 100毫秒防抖

    onMounted(() => {
        calculateWidth();
        window.addEventListener('resize', calculateWidth);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', calculateWidth);
    });

    return { containerWidth }
}
