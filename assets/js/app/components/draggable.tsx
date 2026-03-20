import React, { PropsWithChildren } from "react"

import { bemBlock } from "@libs/utils";

import { useDraggable } from "@app/hooks/use-draggable";

export const Draggable = ( { children }: PropsWithChildren ) => {
    const { startDrag } = useDraggable();

    return <div onMouseDown={ startDrag } className={ bemBlock.element( 'draggable' ) }>{ children }</div>
}
