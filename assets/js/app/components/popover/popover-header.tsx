import React, { PropsWithChildren } from "react";

import { bemBlock } from "@app/utils/bem";
import { Box } from "@component/ui/box";

export const PopoverHeader = ( { children }: PropsWithChildren ) => {
    return (
        <Box className={ bemBlock.element( 'popover__header' ) }>
            { children }
            <Box className={ bemBlock.element( 'popover__divider' ) }></Box>
        </Box>
    )
}
