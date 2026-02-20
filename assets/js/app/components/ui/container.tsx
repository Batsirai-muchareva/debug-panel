import React, { CSSProperties, forwardRef, PropsWithChildren } from "react";

import { bemBlock } from "@app/utils/bem";

type Props = PropsWithChildren & {
    className?: string;
    style?: CSSProperties;
}

export const Container = forwardRef<HTMLDivElement, Props>( ( { children, className, style }, ref ) =>
    ( <div ref={ ref } className={ bemBlock.elements( ['container' , className ] )} style={ style }> { children } </div> ))
