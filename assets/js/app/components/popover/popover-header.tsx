import React, { PropsWithChildren } from "react";

import { Box } from "@component/ui/box";

export const PopoverHeader = ( { children }: PropsWithChildren ) => {
    return (
        <Box className="dp__popover__header">
            { children }
            <Box className="dp__popover__divider"></Box>
        </Box>
    )
}
