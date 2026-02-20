import React from "react";
import { bemBlock } from "@app/utils/bem";

type Props = {
    className: string;
    onMouseDown: React.MouseEventHandler<HTMLDivElement>;
};

export const ResizeCornerHandle = ( { className, onMouseDown }: Props ) => {
    return (
        <div
            className={ bemBlock.elements( [ 'resizable__handle', 'resizable__handle-corner', className ] )}
            onMouseDown={ onMouseDown }
        />
    );
};
