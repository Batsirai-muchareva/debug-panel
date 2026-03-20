import React, { PropsWithChildren } from "react";
import { Slot } from "@wordpress/components";

import { bemBlock } from "@libs/utils";

import { Box } from "@component/ui/box";

export const TabPanel = ( { children }: PropsWithChildren ) => {

    return (
        <Slot />
        // <Box className={ bemBlock.element( 'tab-content' )}>
        //     { children }
        // </Box>
    )
}
