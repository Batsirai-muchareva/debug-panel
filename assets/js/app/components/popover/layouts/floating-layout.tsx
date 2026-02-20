import React, { forwardRef } from "react";
import { PropsWithChildren } from "react";

import { Container } from "@component/ui/container";
import { useBounds } from "@app/context/bounds-context";

type Props = PropsWithChildren & {
    className: string;
}
export const FloatingLayout = forwardRef<HTMLDivElement, Props>( ( { children, ...props }, ref ) => {
    const { position, size } = useBounds();

    const styles = {
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y,
    }

    return (
        <Container ref={ ref } style={styles} {...props}>
            { children }
        </Container>
    );
} )
