import { useTabs } from '@debug-panel/tabs';

export const useVariantId = () => {
    const { id } = useTabs();

    return id;
}
