import { PathProvider } from '@debug-panel/path';
import { Popover, PopoverContent, PopoverHeader } from '@debug-panel/popover';
import { TabsProvider } from '@debug-panel/tabs';
import { ToolbarProvider } from '@debug-panel/toolbar';
import { Box, Text } from '@debug-panel/ui';

import { DataExplorer } from '../../components/data-explorer';
import { Draggable } from '../../components/draggable';
import { EmptyState } from '../../components/empty-state';
import { Resizable } from '../../components/resizable';
import { ServerButton } from '../../components/server-button';
import { ProviderTabs } from '../../components/tabs/provider-tabs';
import { VariantTabsWrapper } from '../../components/tabs/variant/variant-tabs-wrapper';
import { BrowseProvider, useBrowsePath } from '../../context/browse-context';
import { DataProvider } from '../../context/data-context';
import { useActiveProvider } from '../../hooks/use-active-provider';
import { useHasData } from '../../hooks/use-has-data';
import { useTabsConfigs } from '../../hooks/use-tabs-configs';
import { Content } from './content';

import styles from './panel.module.scss';


export const Panel = () => {
    const providers = useTabsConfigs();

    return (
        <Popover enhance={ Resizable }>
            <PopoverHeader enhance={ Draggable }>
                <Text>
                    Debug Panel
                </Text>
                <ServerButton />
            </PopoverHeader>

            <PopoverContent>
                <TabsProvider tabs={ providers }>
                    <ProviderTabs />

                    <VariantTabsWrapper>
                        <PathProvider>
                            <BrowseProvider>
                                <ToolbarProvider>
                                    <DataProvider>
                                        <Box className={ styles.content }>
                                            <TabContent />
                                        </Box>
                                    </DataProvider>
                                </ToolbarProvider>
                            </BrowseProvider>
                        </PathProvider>
                    </VariantTabsWrapper>
                </TabsProvider>
            </PopoverContent>
        </Popover>
    );
};

const TabContent = () => {
    const hasData = useHasData();
    const { browsable = false } = useActiveProvider();
    const { browsePath } = useBrowsePath();

    if ( browsable && ! browsePath ) {
        return <DataExplorer />
    }

    if ( ! hasData ) {
        return <EmptyState />;
    }

    return <Content />
}

// Sidebar pin
// AI
// Timeline
// record interactive & play
