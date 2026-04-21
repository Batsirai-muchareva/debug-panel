import { useMemo } from 'react';

import { providerRegistry } from '@debug-panel/providers';

import { useTabs } from '../context/tabs-context';

export const useProvider = () => {
    const { provider } = useTabs();

    return useMemo( () => providerRegistry.find( provider.id ), [ provider.id ] )
}
