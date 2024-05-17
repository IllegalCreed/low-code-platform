import type { _RouteLocationBase, RouteLocationNormalized } from "vue-router";

export function useMenuSelect(defaultMenuSelectedKey: string, onNaviagtionBlocked: (name: string) => void) {
    const activeIndex = ref(defaultMenuSelectedKey);
    const router = useRouter();
    function handleMenuSelect(key: string, keyPath: string[]) {
        router.push({
            name: key,
        });
    }
    const setCurrentMenuSelect = (route: _RouteLocationBase) => {
        activeIndex.value = route.meta.belong as string;
    };
    router.afterEach(
        (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
            setCurrentMenuSelect(to);
        }
    );
    router.beforeEach(
        (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
            if (!to.meta.needToNaviagte as boolean) {
                onNaviagtionBlocked(to.name as string);
                return false;
            }
        }
    );

    setCurrentMenuSelect(router.currentRoute.value);

    return { activeIndex, handleMenuSelect }
}