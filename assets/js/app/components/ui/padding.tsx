import { bemBlock } from "@app/utils/bem";
import React, { CSSProperties, PropsWithChildren } from "react";

export const Padding = ( { children, style }: PropsWithChildren & { style?: CSSProperties; } ) => {
    return <div style={ style } className={ bemBlock.element( 'padding' )}>{ children }</div>
}
