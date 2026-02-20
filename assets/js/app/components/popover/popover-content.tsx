import React, { PropsWithChildren } from "react";

import { bemBlock } from "@app/utils/bem";

export const PopoverContent = ( { children }: PropsWithChildren ) => {
    return <div className={ bemBlock.element( 'popover__content' )}>{ children }</div>
}
