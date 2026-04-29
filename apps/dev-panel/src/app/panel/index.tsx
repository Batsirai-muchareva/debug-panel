import { type PropsWithChildren, useEffect } from 'react';

import { PathProvider } from '@debug-panel/path';
import { providerRegistry } from '@debug-panel/providers';
import { ToolbarProvider } from '@debug-panel/toolbar';
import { Text } from '@debug-panel/ui';

import { DataExplorer } from '../../components/data-explorer';
import { EmptyState } from '../../components/empty-state';
import { Popover } from '../../components/popover';
import { PopoverContent } from '../../components/popover/popover-content';
import { PopoverHeader } from '../../components/popover/popover-header';
import { ServerLogsButton } from '../../components/server-button';
import { ProviderTabs } from '../../components/tabs/provider-tabs';
import { VariantTabs } from '../../components/tabs/variant-tabs';
import { DataProvider, useData } from '../../context/data-context';
import { TabsProvider } from '../../context/tabs-context';
import { useVariant } from '../../hooks/use-variant';
import { Content } from './content';
import { PinPopover } from '../../components/pin-popover';

// CENTRAL PLACE TO HANDLE PERSIST OF VALUES

export const Panel = () => {
    useEffect( () => {
        providerRegistry.prefetchAll(); // TODO make this more clearer
    }, [] );

    return (
        <Popover>
            <PopoverHeader>
                <Text>
                    Debug Panel
                </Text>
                <ServerLogsButton />
                <PinPopover />
            </PopoverHeader>

            <PopoverContent>
                <TabsProvider>
                    <ProviderTabs />
                    <VariantTabs />
                    <PathProviderWithVariant>
                        <ToolbarProvider>
                            <DataProvider>
                                <TabContent />
                            </DataProvider>
                        </ToolbarProvider>
                    </PathProviderWithVariant>
                </TabsProvider>
            </PopoverContent>
        </Popover>
    );
};

const TabContent = () => {
    const { isEmpty, isExploring } = useData();

    if ( isExploring ) {
        return <DataExplorer />
    }

    if ( isEmpty ) {
        return <EmptyState />;
    }

    return <Content />
}

const PathProviderWithVariant = ( { children }: PropsWithChildren ) => {
    const { id } = useVariant();

    return (
        <PathProvider id={ id }>
            { children }
        </PathProvider>
    )
}
