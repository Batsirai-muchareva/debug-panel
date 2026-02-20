import React, { PropsWithChildren } from "react";
import { Box } from "@component/ui/box";
import { bemBlock } from "@app/utils/bem";

export const TabContent = ( { active, children }: PropsWithChildren & { active: boolean } ) => {

    if ( ! active ) {
        return null;
    }

    return (
        <Box className={ bemBlock.element( 'tab-content' )}>
            { children }
        </Box>
    )
}
