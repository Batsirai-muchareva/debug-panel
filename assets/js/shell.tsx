import * as React from "react";

import { PathProvider } from "@libs/path";

import { BrowseProvider } from "@app/context/browse-context";
import { FilteredDataProvider } from "@app/context/filtered-data-context";
import { MAIN_POPOVER_KEY, usePopover } from "@app/context/popover-context";
import { TabsProvider, useTabs } from "@app/context/tabs/tabs-context";

import { MainPopover } from "./main-popover";

export const Shell = () => {
    const { isOpen: mainPopoverState } = usePopover( MAIN_POPOVER_KEY );

    if ( ! mainPopoverState ) {
        return null;
    }

    return (
        <TabsProvider>
            <ShellContent />
        </TabsProvider>
    )
}

const ShellContent = () => {
    const { activeVariant } = useTabs();

    return (
        <PathProvider variantId={ activeVariant }>
            <FilteredDataProvider>
                <BrowseProvider>
                    <MainPopover />
                </BrowseProvider>
            </FilteredDataProvider>
        </PathProvider>
    )
}
