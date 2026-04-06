import { type PropsWithChildren, useMemo } from 'react';

import { providerRegistry } from '@debug-panel/providers';
import { TabsProvider, useTabs } from '@debug-panel/tabs';

import type { ProviderConfig } from '../../../hooks/use-tabs-configs';
import { VariantTabs } from './variant-tabs';

export const VariantTabsWrapper = ( { children }: PropsWithChildren ) => {
    const { id: activeProviderId } = useTabs<ProviderConfig>();

    const variants = useMemo(
        () => providerRegistry.find( activeProviderId )?.variants ?? [],
        [activeProviderId]
    );

    return (
        <TabsProvider key={ activeProviderId } tabs={ variants }>
            <VariantTabs />
            { children }
        </TabsProvider>
    );
};
