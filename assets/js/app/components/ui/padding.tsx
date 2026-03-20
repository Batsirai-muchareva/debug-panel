import React, { CSSProperties, PropsWithChildren } from "react";

import { bemBlock } from "@libs/utils";

export const Padding = ( { children, style }: PropsWithChildren & { style?: CSSProperties; } ) => {
    return <div style={ style } className={ bemBlock.element( 'padding' )}>{ children }</div>
}
