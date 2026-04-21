import { PathProvider } from '@debug-panel/path';
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
import { BrowseProvider, useBrowsePath } from '../../context/browse-context';
import { DataProvider } from '../../context/data-context';
import { TabsProvider } from '../../context/tabs-context';
import { useHasData } from '../../hooks/use-has-data';
import { useProvider } from '../../hooks/use-provider';
import { Content } from './content';

export const Panel = () => {
    return (
        <Popover>
            <PopoverHeader>
                <Text>
                    Debug Panel
                </Text>
                <ServerLogsButton />
            </PopoverHeader>

            <PopoverContent>
                <TabsProvider>
                    <ProviderTabs />
                    <VariantTabs />

                    <PathProvider>
                        <BrowseProvider>
                            <ToolbarProvider>
                                <DataProvider>
                                    <TabContent />

                                    {/*<Box className={ styles.content }>*/}
                                    {/*</Box>*/}
                                </DataProvider>
                            </ToolbarProvider>
                        </BrowseProvider>
                    </PathProvider>
                </TabsProvider>
            </PopoverContent>
        </Popover>
    );
};

const TabContent = () => {
    const hasData = useHasData();
    const { browsePath } = useBrowsePath();
    const { browsable = false } = useProvider();

    if ( browsable && ! browsePath ) {
        return <DataExplorer />
    }

    // if ( ! hasData ) {
    //     return <EmptyState />;
    // }

    return <Content />
}



{/*<TabsProvider tabs={ providers }>*/}
{/*    <ProviderTabs />*/}

{/*    <VariantTabsWrapper>*/}
{/*        <PathProvider>*/}
{/*            <BrowseProvider>*/}
{/*                <ToolbarProvider>*/}
{/*                    <DataProvider>*/}
{/*                        <Box className={ styles.content }>*/}
{/*                            <TabContent />*/}
{/*                        </Box>*/}
{/*                    </DataProvider>*/}
{/*                </ToolbarProvider>*/}
{/*            </BrowseProvider>*/}
{/*        </PathProvider>*/}
{/*    </VariantTabsWrapper>*/}
{/*</TabsProvider>*/}
