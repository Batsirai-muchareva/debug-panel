import React, { CSSProperties, forwardRef } from "react";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
    className?: string;
    style?: CSSProperties;
}
export const Box = forwardRef<HTMLDivElement, Props>(( { children, className, style }, ref ) =>
    <div ref={ ref } className={ className } style={ style }> { children } </div>)
