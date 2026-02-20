import React, { forwardRef, PropsWithChildren } from "react";

import { usePopover } from "@app/context/popover-context";

import { AnchoredLayout } from "@component/popover/layouts/anchored-layout";
import { FloatingLayout } from "@component/popover/layouts/floating-layout";

export type PopoverProps = PropsWithChildren & {
    id: string;
    anchor?: HTMLElement | null;
    width?: number;
    gutter?: {
        top: number;
        left: number;
    };
};

export const Popover = forwardRef<HTMLDivElement, PopoverProps>( ( { children, id, anchor, width, gutter }, ref ) => {
    const { isOpen } = usePopover( id );

    if ( ! isOpen ) {
        return null;
    }

    const PopoverComponent = anchor ? AnchoredLayout : FloatingLayout;

    const componentProps = anchor
        ? { anchor, width, ref, gutter }
        : {};

    return (
        <PopoverComponent ref={ ref } className="popover" { ...componentProps }>
            { children }
        </PopoverComponent>
    )
} )
// use key bind for popover for the popover
// parent -> any open after parent has to be at the left side
