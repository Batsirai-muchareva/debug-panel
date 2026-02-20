import React, { PropsWithChildren } from "react";
import { forwardRef } from "react";

import { useAnchoredPosition } from "@app/hooks/use-anchored-position";

import { Container } from "@component/ui/container";
import { PopoverProps } from "@component/popover/popover";

type Props = PropsWithChildren & {
    anchor?: HTMLElement | null;
    width?: number;
    className: string;
    gutter?: PopoverProps['gutter'];
}
export const AnchoredLayout = forwardRef( ( { children, anchor, width, gutter, ...props }: Props, ref) => {
    const { styles, ref: popoverRef } = useAnchoredPosition( anchor, width );

    const calculatedStyles = () => {
        if ( ! gutter ) {
            return styles;
        }

        return {
            ...styles,
            top: styles.top + gutter.top,
            left: styles.left + gutter.left,
        };
    }

    const setRefs = ( el: HTMLDivElement ) => {
        popoverRef.current = el;
        if ( ref ) {
            if ( typeof ref === "function" ) {
                ref( el )
            } else {
                ref.current = el;
            }
        }
    };

    return (
        <Container ref={ setRefs } style={ calculatedStyles() } {...props}>
            {children}
        </Container>
    );
    }
);
